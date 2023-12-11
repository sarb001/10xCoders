const express = require('express') ;
const { connectDb } = require('./Database/Db');
const app = express();
const dotenv = require('dotenv');
const  cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');

dotenv.config({path:'../backend/config.env'});

connectDb();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended :true}));
const  PORT = process.env.PORT;

cloudinary.config({
      cloud_name : 'damnzg3hr',
      api_key    : '768656285376826',
      api_secret : 'TYpy3bo3TbZtdOPF0-pZOau-aKY',
})

const user = require('./routes/User.js');
const course = require('./routes/Course.js');

app.use('/api/v1' , user);

app.use('/api/v1' , course);

app.listen(PORT, (req,res)  => {
   console.log(` Server Running onn ${PORT} Broo`);
})