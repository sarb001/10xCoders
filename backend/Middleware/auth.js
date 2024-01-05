
import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

export const isAuthenticated = async(req,res,next) => {
    console.log('auth started ');
    const { token } = req.cookies;
    if(!token){
        console.log('token not Present');
        return next();
    }
    try {
        const decoded = await jwt.verify(token,'tokensecret');
        console.log('decodeod -',decoded);
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

export const authorizeOrders = (req, res, next) => {
    console.log('authorized orders -');
    if (req.user.order?.status !== "paid")
    return res.status(403).json({
        success : false,
        message : "Only Paid  Course can access Resource",
    })
    next();
};