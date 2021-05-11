import dotenv from "dotenv"
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'
import {authenticateJwt} from "./secret.js"
import cors from "cors"
const app = express();

//import { options ,swaggerUi,swaggerJsdoc } from './swaggerDoc.js'
const { PORT, MONGO_URI } = process.env;
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(authenticateJwt);
import apiRouter from './routes/root.js'

app.use('/api', apiRouter);




// CONNECT TO MONGODB SERVER
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // 몽고디비 서버에 연결
    console.log("Connected to mongod server");
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));