import express from 'express'


const authRouter = express.Router();
authRouter.use(express.urlencoded({ extended: true}));


authRouter.get('/',async (req,res)=>{
    
})

export default authRouter;