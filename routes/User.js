import express from 'express'
import hash from '../secret.js'

const userRouter= express.Router();
userRouter.use(express.urlencoded({ extended: true }));

import {User} from '../models/models.js'


userRouter.post('/create',async (req,res)=>{
   
    const pass = hash(req.body.password)
    
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = pass;
    user.image = req.body.image;
    user.age = req.body.age;
    user.sex = req.body.sex;
    user.adress = req.body.adress;
    user.bio = req.body.bio;
    user.birth = req.body.birth;
    user.myGroup = req.body.myGroup;
    user.posts = req.body.posts;
    user.schedule = req.body.schedule;

    await user.save((err,user)=>{
        if(err){
            console.log(err)
            res.send("실패")
        }
        res.json({message: "user created",data: user})
    })

});

userRouter.get('/findall',async (req,res)=>{
    await User.find({}, (err,user)=>{
        if (err) { 
            console.log(err)
            res.status(500).send("User 전체 조회 실패.");
        }res.status(200).send(user);
    });
});

userRouter.delete('/delete',async (req,res)=>{
  
   await User.findByIdAndRemove({_id: req.body.id}, function (err, user) {
        if (err) return res.status(500).send("User 삭제 실패");
        res.status(200).send("User "+ user.name +" 삭제됨.");
    });
})
userRouter.put('/update?id=',async (req,res)=>{
    console.log(req.params);
    await User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("User 수정 실패.");
        res.status(200).send(user);
    });
})

export default  userRouter;