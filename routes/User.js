import express from 'express'


const router= express.Router();
router.use(express.urlencoded({ extended: true }));

import User from '../models/models'

router.post('/User/create',(req,res)=>{
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
        age: req.body.age,
        sex: req.body.sex,
        adress: req.body.sex,
        bio: req.body.bio,
        birth: req.body.birth,
        myGroup: req.body.myGroup,
        posts: req.body.posts,
        schedule: req.body.schedule,
    },
    (err,user)=>{
        if (err) return res.status(500).send("User 생성 실패.");
            res.status(200).send(user);
    })
})
router.Post