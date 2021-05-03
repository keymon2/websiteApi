import express from 'express'


const router= express.Router();
router.use(express.urlencoded({ extended: true }));

import Posts from '../models/models'

router.post('/User/create',(req,res)=>{
    User.create({
        title: req.body.title,
        writer: req.body.writer,
        content: req.body.content,
        image: req.body.image,
        comments:req.body.comments,
        likes : req.body.likes,
        comment_count: req.body.comment_count,//../modles PostSchema 오타있음. comment_count
        like_count: req.body.like_count,
    },
    (err,user)=>{
        if (err) return res.status(500).send("Posts 생성 실패.");
            res.status(200).send(user);
    })
});

router.get('/Posts/get',(req,res)=>{
    Posts.find({}, (err,user)=>{
        if (err) return res.status(500).send("Posts 전체 조회 실패.");
        res.status(200).send(users);
    });
});

router.delete('/Posts/delete/:id',(req,res)=>{
    Posts.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Posts 삭제 실패");
        res.status(200).send("Posts "+ user.title +" 삭제됨.");
    });
})

router.put('/Posts/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("User 수정 실패.");
        res.status(200).send(user);
    });
})