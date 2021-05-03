import express from 'express'

const router = express.Router();
router.use(express.urlencoded({ extended: true}));

import Comment from '../models/models'

router.post('/Comment/create', (req,res)=>{
    Comment.create({
        content: req.body.content,
        likes: req.body.likes,
        post_id: req.body.post_id,
        user_id: req.body.user_id,      
    },
    (err,user)=>{
        if(err) return res.status(500).send("Comment 생성 실패.");
            res.status(200).send(user);
    })
});

router.get('/Comment/get', function(req, res) {
    Comment.find( {}, function(err, user) {
        if (err) return res.status(500).send("Comment 전체 조회 실패.");
        res.status(200).send(users);
    });
});

router.delete('/Comment/delete/:id', (req, res)=> {
    Comment.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Comment 삭제 실패");
        res.status(200).send("User "+ user.post_id +" 삭제됨.");
    });
});

router.put('/Comment/update/:id', (req, res)=> {    
    Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("Comment 수정 실패.");
        res.status(200).send(user);
    });
});