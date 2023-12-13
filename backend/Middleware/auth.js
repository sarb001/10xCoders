const jwt = require('jsonwebtoken');
const User = require('../models/User.js')

exports.isAuthenticated = async(req,res,next) => {
    try {
        const { token } = req.cookies;
        // console.log('cookies -',req.cookies);
        // console.log('token auth -',token);
        if(!token){
            console.log('token not Present');
            return next();
        }
        const decoded = await jwt.verify(token,'tokensecret');
        req.user = await User.findById(decoded._id);
        next();

    } catch (error) {
        console.log('error --',error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

export const authorizeSubscribers = (req, res, next) => {
    if (req.user.subscription.status !== "active")
    return res.status(500).json({
        success : false,
        message : error.message,
    })
  };