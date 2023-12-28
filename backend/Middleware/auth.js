
import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

export const isAuthenticated = async(req,res,next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            console.log('token not Present');
            return next();
        }
        const decoded = await jwt.verify(token,'tokensecret');
        req.user = await User.findById(decoded._id);
        console.log('auth passedp');
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
    console.log('authorized subs -');
    if (req.user.subscription.status !== "active")
    return res.status(403).json({
        success : false,
        message : "Only Subscribers can access this Resource",
    })
    next();
};