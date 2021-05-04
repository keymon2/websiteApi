import express from 'express'


const router= express.Router();
router.use(express.urlencoded({ extended: true }));

import Posts, { Post } from '../models/models'

router.post('/create',async (req,res)=>{
        post = new Post();
        
        post.title = req.body.title,
        post.writer = req.body.writer,
        post.content = req.body.content,
        post.image = req.body.image,
        post.comments = req.body.comments,
        post.likes  = req.body.likes,
        post.comment_count = req.body.comment_count,//../modles PostSchema 오타있음. comment_count
        post.like_count = req.body.like_count,

        await post.save((err,post)=> {
            if(err){
                console.log(err)
                res.send("실패")
            }
            res.json({message: "user created",data: user})
        })
});

router.get('/findall',(req,res)=>{
    Posts.find({}, (err,user)=>{
        if (err) return res.status(500).send("Posts 전체 조회 실패.");
        res.status(200).send(users);
    });
});

router.delete('/delete',(req,res)=>{
    Posts.findByIdAndRemove({_id: req.body.id}, function (err, user) {
        if (err) return res.status(500).send("Posts 삭제 실패");
        res.status(200).send("Posts "+ user.title +" 삭제됨.");
    });
})

router.put('/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("User 수정 실패.");
        res.status(200).send(user);
    });
})