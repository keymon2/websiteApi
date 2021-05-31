import express from 'express'


const albumRouter = express.Router();
albumRouter.use(express.urlencoded({ extended: true}));

import {Album, User,Image} from '../models/models.js'


albumRouter.get('/find',async(req,res)=>{
    if( !req.user ){
        return res.status(204).send({success: false})
    }
    const user = req.user
    const album = await Album.findById({_id: user.album })
    return res.status(200).send({data: album});
    
})

albumRouter.get('/findall',async (req,res)=>{
    
    await Album.find({}, (err,album)=>{
        if (err) { 
            console.log(err)
            res.status(500).send("album 전체 조회 실패.");
        }res.status(200).send(album);
    });
});

albumRouter.post('/insert', async(req,res) => {
    if( !req.user ){
        return res.status(204).send({success: false})
    }
    const user = req.user

    try{
        const album = await Album.findById({_id: user.album })
        const image = req.body.image
        if(!image)return res.send(204).json({success: fail})
        
        image.map( img => 
            album.image.push(new Image({
                src: img.src,
                location: img.location
            }) )
            )
        album.save((err)=>{
            if(!err){
                console.log('saved');
                return res.status(200).send({success: true, save: true});
            }
            if(err){
                console.log(' not save');
                return res.status(203).send({success: true, save: false});
            }
            })}
    catch(err){
        console.log(err)
    }

})

albumRouter.put('/deleteImage', async(req,res)=>{
    if( !req.user ){
        return res.status(204).send({success: false})
    }
    const user = req.user

    try{
        const album = await Album.findById({_id: user.album})

        req.body.image.map( img => {
             album.image.id(img._id).remove();
        })
        await album.save(function (err) {
            if (err) return handleError(err);
            console.log('the subdocs were removed');
          });
        return res.status(200).json({success: true})
    }catch(err){
        console.log(err);
    }
})

export default albumRouter;