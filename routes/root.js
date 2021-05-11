import express from 'express';
const apiRouter = express.Router();

import userRouter from "./User.js"
import groupRouter from "./Group.js"

import loginRouter from "./Login.js"


apiRouter.use('/Group',groupRouter);
apiRouter.use('/User',userRouter);
apiRouter.use('/Login',loginRouter);


export default apiRouter;