import express from 'express'
import { group } from 'node:console';

const router = express.Router();
router.use(express.urlencoded({ extended: true}));

import Group from '../models/models'

router.post('/Group/create', (req,res)=>{
    Group.create({
        name: req.body.name,
        bio: req.body.bio,
        myUser: req.body.myUser,
        schedule: req.body.schedule,
        postBoard: req.body.postBoard,
        image: req.body.image,
    },
    (err,group)=>{
        if(err) return res.status(500).send("Group 생성 실패.");
            res.status(200).send(user);
    })
});

router.get('/Group/get', function(req, res) {
    User.find( {}, function(err, users) {
        if (err) return res.status(500).send("Group 전체 조회 실패.");
        res.status(200).send(users);
    });
});

router.delete('/Group/delete/:id', (req, res)=> {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Group 삭제 실패");
        res.status(200).send("User "+ user.name +" 삭제됨.");
    });
});

router.put('/Group/update/:id', (req, res)=> {    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("Group 수정 실패.");
        res.status(200).send(user);
    });
});