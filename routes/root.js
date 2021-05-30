import express from 'express';
const apiRouter = express.Router();

import userRouter from "./User.js"
import groupRouter from "./Group.js"

import loginRouter from "./Login.js"
import albumRouter from './Album.js'

apiRouter.use('/Group',groupRouter);
apiRouter.use('/User',userRouter);
apiRouter.use('/Login',loginRouter);
apiRouter.use('/Album', albumRouter);

export default apiRouter;