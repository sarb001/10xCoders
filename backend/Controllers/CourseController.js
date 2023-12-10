const Course = require('../models/Course.js');
const User = require('../models/User.js');

exports.CreateCourse = async(req,res) => {
    try {
          if(!req.user){
            return res.status(401).json({message : " UnAuthorized "});    
          }

           const { title , price , creator } = req.body;
           if(!title || !price){
            return res.status(400).json({
                success  :  false,
                message  : " Provide All Fields "
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

exports.AllCourses    = async(req,res) => {
    try {
        const allcourses = await Course.find({});
        res.status(200).json({
            success : true,
            message : " All Courses Fetched Successfully ",
            allcourses
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message: error.message
        })
    }
}

exports.GetLoggedUserCourse = async(req,res) => {
    try {
        if(!req.user){
            return res.status(401).json({message : " UnAuthorized "});    
          }
        
          const loggeduser = req.user._id;
          const user = await User.findById(loggeduser);

          // find user in  course which is   equal to creator id 
          const findusers = await Course.find({
             creator : {
                 $in : user
             }
          })

        //   const specficuserid = findusers.map((i) => i._id);
        //   const specficusertitle = findusers.map((i) => i.title);

          user.courselist.push(
            ...findusers.map(course => ({
                courseid :  course._id,
                title: course.title
            }))
          )    

          await user.save();
          return res.status(200).json({
            success :true,
            findusers 
          })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message: error.message
        })
    }
}