import express from 'express'


const router= express.Router();
router.use(express.urlencoded({ extended: true }));

import User from '../models/models'

/**
 * @swagger
 *  /User:
 *    post:
 *      tags:
 *      - product
 *      description: 모든 제품 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: category
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 */
router.post('/User',async (req,res)=>{
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
        age: req.body.age,
        sex: req.body.sex,
        adress: req.body.adress,
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
});

router.get('/User',async (req,res)=>{
    await User.find({}, (err,user)=>{
        if (err) return res.status(500).send("User 전체 조회 실패.");
        res.status(200).send(users);
    });
});

router.delete('/User/:id',async (req,res)=>{
   await User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("User 삭제 실패");
        res.status(200).send("User "+ user.name +" 삭제됨.");
    });
})

router.put('/User/:id',async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("User 수정 실패.");
        res.status(200).send(user);
    });
})


module.exports = router;