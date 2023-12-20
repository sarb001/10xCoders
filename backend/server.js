const express = require('express') ;
const { connectDb } = require('./Database/Db');
const app = express();
const dotenv = require('dotenv');
const  cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config({path:'../backend/config.env'});

connectDb();

// middlewars 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({extended :true}));

const  PORT = process.env.PORT;

cloudinary.config({
      cloud_name : process.env.CLOUD_NAME,
      api_key    : process.env.API_KEY,
      api_secret : process.env.API_SECRET,
})


const user = require('./routes/User.js');
const course = require('./routes/Course.js');

const instance = new Razorpay({
      key_id     :"DFEF",
      key_secret : "DFEF",
      // key_id: 'rzp_test_VcpymMeDorzIgC',
      // key_secret :'89WhuftkBjjTUdHQoSJXqxs3'
});
module.exports = instance;

app.use('/api/v1' , user);
app.use('/api/v1' , course);

// app.get('/', (req,res) => {
//       res.send(' Backend is Working... ')
// })

app.listen(PORT, (req,res)  => {
   console.log(` Server Running onn ${PORT} Broo`);
})