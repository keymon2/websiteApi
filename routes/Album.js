import express from 'express'


const albumRouter = express.Router();
router.use(express.urlencoded({ extended: true}));

import Album from '../models/models.js'
import User from '../models/models.js'

AlbumRouter.post('/create',async(req,res)=>{
    
    const user = async User.find()


})