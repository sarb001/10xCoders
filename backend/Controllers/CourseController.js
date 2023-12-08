const Course = require('../models/Course.js');

exports.CreateCourse = async(req,res) => {
    
    try {

          if(!req.user){
            return res.status(401).json({message : " UnAuthorized "});    
        }

           const { title , price ,creator } = req.body;
           if(!title || !price){
            return res.status(400).json({
                success  :false,
                message : " Provide All Fields "
            })
           }
 
           const createCourse = await Course.create({
              title,
              price,
              creator : req?.user._id
           });

           res.status(201).json({ success: true,
                message : " Course Created ",
                createCourse,
           })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message: error.message
        })
    }
}


exports.AllCourses = async(req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message: error.message
        })
    }
}