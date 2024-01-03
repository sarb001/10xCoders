
import Course from '../models/Course.js';
import User from '../models/User.js';
import cloudinary from 'cloudinary';


export const Register = async(req,res) => {
    try {
        const {name,email,password,profilepic} = req.body;

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

        let mycloud;

        if(!profilepic){
            const profilepic = 'https://www.pngitem.com/pimgs/m/516-5167304_transparent-background-white-user-icon-png-png-download.png';
             mycloud = await cloudinary.v2.uploader.upload(profilepic ,{
                 folder: "10xcourse-img"
             });

        }else{
            mycloud = await cloudinary.v2.uploader.upload(profilepic ,{
               folder : "10xcourse-img"
            });
        }

        user  = await User.create({
            name,
            email,
            password,
            profilepic : {
                public_id  : mycloud.public_id,
                url : mycloud.secure_url,
            }
        })
        console.log('user is --',user);
        res.status(201).json({success : true , user });

    } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message,
            })
    }
}

export const Login    = async(req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : " Provide All Fields "
           })
        }
        console.log('user request body -',{email,password});
        const user = await User.findOne({email}).select('+password');
        console.log('user login -',user);

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

        const token = await user.generateToken();
        console.log('token generated -',token);

        res.status(200).cookie('token',token, {
            secure: true,
            expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite : 'none'
        }).json({
            success : true,
            user,
            token
        })

    } catch (error) {
        console.log('error in login -',error);
        return res.status(500).json({
            success : false,
            message : error.message,  
        })
    }
}

export const  Logout = async(req,res) => {
    try {
        res.status(200).cookie('token',null, {
            expires : new Date(Date.now()),
            httpOnly : true
        }).json({
            success : false,
            message: "Logged Out"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const MyProfile = async(req,res) => {
    try {
        const user  = await User.findById(req.user?._id);
        
        return res.status(200).json({
            success : true,
            message : " User Loaded ",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}