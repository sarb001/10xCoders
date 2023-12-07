const express = require('express') ;
const { connectDb } = require('./Database/Db');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path:'../backend/config.env'});

connectDb();

const  PORT = process.env.PORT;

app.listen(PORT, (req,res)  => {
   console.log(` Server Running onn ${PORT} Broo`);
})