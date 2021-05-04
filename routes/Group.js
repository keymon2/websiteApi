import express from 'express'


const groupRouter = express.Router();
groupRouter.use(express.urlencoded({ extended: true}));
import {Group} from '../models/models.js'

groupRouter.post('/Group/create', (req,res)=>{
    Group.create({
        name: req.body.name,
        bio: req.body.bio,
        myUser: req.body.myUser,
        schedule: req.body.schedule,
        postBoard: req.body.postBoard,
        image: req.body.image,
    },
    (err,user)=>{
        if(err) return res.status(500).send("Group 생성 실패.");
            res.status(200).send(user);
    })
});

groupRouter.get('/Group/get', function(req, res) {
    Group.find( {}, function(err, user) {
        if (err) return res.status(500).send("Group 전체 조회 실패.");
        res.status(200).send(users);
    });
});

groupRouter.delete('/Group/delete/:id', (req, res)=> {
    Group.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Group 삭제 실패");
        res.status(200).send("User "+ user.name +" 삭제됨.");
    });
});

groupRouter.put('/Group/update/:id', (req, res)=> {    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("Group 수정 실패.");
        res.status(200).send(user);
    });
});

export default groupRouter;