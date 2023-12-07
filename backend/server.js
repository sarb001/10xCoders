const express = require('express') ;
const { connectDb } = require('./Database/Db');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path:'../backend/config.env'});

connectDb();

app.use(express.json());
app.use(express.urlencoded({extended :true}));

const  PORT = process.env.PORT;

const user = require('./routes/User.js');

app.use('/api/v1' , user);

app.listen(PORT, (req,res)  => {
   console.log(` Server Running onn ${PORT} Broo`);
})