import dotenv from "dotenv"
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
const app = express();
//import { options ,swaggerUi,swaggerJsdoc } from './swaggerDoc.js'
const { PORT, MONGO_URI } = process.env;
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// specs = swaggerJsdoc(options);
//app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(specs,{explorer: true}));

import userRouter from "./routes/User.js"
import groupRouter from "./routes/Group.js"
import authRouter from "./routes/Auth.js"


app.use('/Auth',authRouter);
app.use('/Group',groupRouter);
app.use('/User',userRouter);


// CONNECT TO MONGODB SERVER
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // 몽고디비 서버에 연결
    console.log("Connected to mongod server");
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));