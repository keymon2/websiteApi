import express from 'express'
import{ hash }from '../secret.js'

const userRouter= express.Router();
userRouter.use(express.urlencoded({ extended: true }));
import {isAuthenticated} from "../middleware.js"

import {Album, User} from '../models/models.js'



userRouter.post('/create',async (req,res)=>{
    if(req.user){
        res.send("arleady login")
    }


    let pass = {
        password: "asd",
        salt: "asd"
    }
    try{
    console.log(req.body.password)
    pass = await hash(req.body.password)
    console.log(pass)
    const user = new User();
    const album = new Album();
    album.who = user._id;
    user.name = req.body.name;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.city = req.body.city;
    user.country = req.body.country;
    user.email = req.body.email;
    user.pass = pass.password;
    user.salt = pass.salt
    user.image1 = req.body.image1;
    user.image2 = req.body.image2;
    user.age = req.body.age;
    user.sex = req.body.sex;
    user.adress = req.body.adress;
    user.bio = req.body.bio;
    user.birth = req.body.birth;
    user.myGroup = req.body.myGroup;
    user.posts = req.body.posts;
    user.schedule = req.body.schedule;
    user.album = album._id;
     album.save((err, album)=>{
        if(err){
            return res.status(204).json({success: false, data: "album"})
        }

    })
    user.save(async(err,user)=>{
        if(err){
            console.log(err)

            album.remove({_id: album._id})
            return res.status(204).json({"success": fasle, "data": "user"})
        }
        await album.save((err, user))
        res.json({"success": true,"data": user})
    })
    }catch(error){
        console.log(error)
    }
    
});

userRouter.get('/findall',async (req,res)=>{
    await User.find({}, (err,user)=>{
        if (err) { 
            console.log(err)
            return res.status(500).send("User 전체 조회 실패.");
        }return res.status(200).json(user);
    });
});

userRouter.delete('/delete',async (req,res)=>{
  
   await User.findByIdAndRemove({_id: req.body.id}, function (err, user) {
        
        if (err) return res.status(500).send("User 삭제 실패");
        return res.status(200).send("User "+" 삭제됨.");
    });
})
userRouter.post('/update',async (req,res)=>{

    console.log(req.body)
    if(req.body.password){
           let pass = {
                password: "asd",
                salt: "asd"
            }

            console.log(req.body.password)
            pass = await hash(req.body.password)
            console.log(pass)
            req.body.password = pass.password
            req.body.salt = pass.salt
            await User.findByIdAndUpdate({_id: req.user.id}, req.body, {new: true}, 
                function (err, user) {
                    if (err) return res.status(500).send("User 수정 실패.");
                    console.log(user);
                    return res.status(200).json({success: true, data:user });
            });
    }else{
       
        await User.findByIdAndUpdate({_id: req.user.id}, req.body, {new: true}, 
            function (err, user) {
                if (err) return res.status(500).send("User 수정 실패.");
                console.log(user);
                return res.status(200).json({success: true, data:user });
        });
    }})

userRouter.get('/findId', async (req, res)=> {
    if(!req.user) return res.status(204).json({"success": false})
    console.log(req.user)
    return res.status(200).json({"success": true, "data": req.user})
})




export default  userRouter;