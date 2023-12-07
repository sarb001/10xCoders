const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        select :false,
     },
   //   profilepic :{
   //      public_id : String,
   //      url : String
   //   }
})

//hashing password
UserSchema.pre('save' , async function(next){
    if(this.isModified("password")){
       this.password = await bcrypt.hash(this.password ,10)
    }
    next();
 })  

// match password
UserSchema.methods.matchpassword = async (hashpassword , password) => {
   return await bcrypt.compare(password,hashpassword);
}

UserSchema.methods.generateToken = async() => {
   return jwt.sign({_id : this._id}, 'tokensecret')
}


mongoose.models = {}

const User = mongoose.models.User || mongoose.model('User' , UserSchema);

module.exports = User;