import crypto  from 'crypto'
import {User} from './models/models.js'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import {Strategy as JwtStrategy,ExtractJwt} from 'passport-jwt'
import dotenv from "dotenv"
dotenv.config(); 



export const hash = async (password) => {

    return new Promise(async (resolve, reject) => {
        try {
            const salt = (await crypto.randomBytes(32)).toString('hex');
            crypto.pbkdf2(password, salt , 1, 32, 'sha512', (err, derivedKey) => {
                if(err) throw err;
                const password = derivedKey.toString('hex');
                resolve({password,salt});
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
}

export const hash_salt = async( password, salt) => {

    return new Promise(async (resolve, reject) => {
        try {
            crypto.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
                if(err) throw err;
                const hashed = derivedKey.toString('hex');
                resolve(hashed);
            });
        } catch (err) {
            console.log(err);
        }
    })
} 
export const jwt_sign= async({userid, username, useremail,secret}) =>{
    return  jwt.sign({userid},secret)
}



const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export const authenticateJwt= async(req,res,next) => {
    console.log(req.body)
    passport.authenticate("jwt", { sessions : false },(error,user,info) => {
        if (!user) { console.log(`"status':'fail','message'`); }
        if (user) {
         req.user = user;
         console.log(req.body)
        }
     next();
    })(req,res,next);
   
}
   

passport.use(new JwtStrategy(jwtOptions, async(jwt_payload,done)=>{

    try{
        const user = await User.findOne({_id: jwt_payload.id})
        if(user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }

    }catch(err){
        return done(err, false)
    }
}));
passport.initialize();