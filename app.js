import dotenv from "dotenv"
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
const app = express();
import { specs ,swaggerUi } from './swaggerDoc.js'

const { PORT, MONGO_URI } = process.env;
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',swaggerUi.serve, swaggerUi.setup(specs,{explorer: true}));




// CONNECT TO MONGODB SERVER
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));