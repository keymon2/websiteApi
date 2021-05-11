import express from 'express';
const loginRouter = express.Router();
import jwt from 'jsonwebtoken'
import {User} from '../models/models.js'
import {hash_salt,jwt_sign} from '../secret.js'

loginRouter.post('/login',async (req,res)=>{
    const {useremail, userpassword} = req.body
    try{ 
    const user = await User.findOne({email: useremail});
    
    const secret = process.env.JWT_SECRET;
    console.log(user)
    console.log(typeof(userpassword))
        if(!user) {// user is not existed
        res.send({"success": false})
        }else{
          const passwordToCheck = await hash_salt(userpassword,user.salt);
            if( user.pass == passwordToCheck ) {
                const id = user._id
                  const token = jwt.sign({id},secret)
               res.send({"success": true, data:token})
               console.log("success")
             }else{
            res.send({"success": false, password: user.password, passwordToCheck: passwordToCheck})
        
            }
        }
    }catch(error){
        console.log(error)
    }
})




export default loginRouter