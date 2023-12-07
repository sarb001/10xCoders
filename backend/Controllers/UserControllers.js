const User = require('../models/User.js');


exports.Register = async(req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name|| !email || !password){
            return res.status(400).json({
                 success : false,
                 message : " Provide All Fields "
            })
        }

        const userexist = await User.findOne({email});

        if(userexist){
            return res.status(400).json({
                 success : false,
                 message : " Email Already Exist "
            })
        }

        user  = await User.create({
            name,
            email,
            password,
            // avatar
        })
        res.status(201).json({success : true , user });

    } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message,
            })
    }
}

exports.Login = async(req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : " Provide All Fields "
           })
        }

        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(400).json({
                success : false,
                message : " User Not Found "
           })
        }

        const matchpass = await user.matchpassword(user.password,password);

        if(!matchpass){
            return res.status(400).json({
                success : false,
                message : " Password Incorrect "
           })
        }

        res.status(200).json({
            success : true,
            message : " Logged Successfully ",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,  
        })
    }
}