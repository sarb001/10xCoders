const Course = require('../models/Course.js');

exports.CreateCourse = async(req,res) => {
    
    try {
           const { title , price } = req.body;
           if(!title || !price){
            return res.status(400).json({
                success  :false,
                message : " Provide All Fields "
            })
           }
 
           const createCourse = await Course.create({
              title,
              price 
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