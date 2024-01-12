                                    
import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

export const isAuthenticated = async(req,res,next) => {

        console.log('auth started ');
        const {token} = req.cookies;
        
        console.log(' token fetched ');
        if(!token){ 
            return res.status(401).send("Access denied...No token provided...");
        }
        console.log(' inside try catch 1');
        try {
            console.log(' inside try catch token',process.env.TOKEN_SECRET);
            const decoded =  jwt.verify(token,process.env.TOKEN_SECRET);
            console.log('decodeod -',decoded);
            req.user = await User.findById(decoded._id);
            console.log('auth passedp');
            return next();

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