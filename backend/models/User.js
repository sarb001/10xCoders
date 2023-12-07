const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     name : {
        type : String,
        required : [true,"Please Enter a Name "]
     },
     email : {
        type : String,
        required : [true,"Please Enter  your Email "],
        unique   : [true,"Email Already Exists"]
     },
     password : {
        type : String,
        required  : [true,"Please Enter a Name "],
        minLength : [6,"Password must be atleast  6 characters"],
     },
   //   profilepic :{
   //      public_id : String,
   //      url : String
   //   }
})

mongoose.models = {}

const User = mongoose.models.User || mongoose.model('User' , UserSchema);

module.exports = User;