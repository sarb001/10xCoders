
import express from 'express';
import { connectDb } from './Database/Db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay';
import cors from 'cors';
import bodyParser from 'body-parser';

import user from './routes/User.js';
import course from './routes/Course.js';

const app = express();

dotenv.config({path:'../backend/config.env'});

connectDb();

// middlewars

app.use(express.json({limit : '50mb'}));
app.use(cookieParser());
app.use(express.urlencoded({extended :true}));

const  PORT = process.env.PORT;

cloudinary.config({
      cloud_name : process.env.CLOUD_NAME,
      api_key    : process.env.RAZORPAY_KEY_ID,
      api_secret : process.env.RAZORPAY_KEY_SECRET,
})

 export var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret :process.env.RAZORPAY_KEY_SECRET,
});

app.use('/api/v1' , user);
app.use('/api/v1' , course);

// app.get('/', (req,res) => {
//       res.send(' Backend is Working... ')
// })

app.listen(PORT, (req,res)  => {
   console.log(` Server Running onn ${PORT} Broo`);
})