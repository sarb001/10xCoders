const Razorpay = require('razorpay');
const Course = require('../models/Course.js');
const User = require('../models/User.js');
const cloudinary = require('cloudinary');
const { instance } = require('../server.js');


exports.CreateCourse = async(req,res) => {
    try {
          if(!req.user){
            return res.status(401).json({message : " UnAuthorized "});    
          }

           const { title , price  , description } = req.body;
           console.log('request course body -',{title,price , description});
           if(!title || !price || !description){
            return res.status(400).json({
                success  :  false,
                message  : " Provide All Fields "
            })
           }

        //     const mycloud = await cloudinary.v2.uploader.upload(req.body.image , {
        //         folder : "courseposter"
        //     })
        //   console.log('mycloud -',mycloud);

           const createCourse = await Course.create({
              title,
              price,
              description,
              creator : req?.user._id,
              courseposter : {
                 public_id : "mycloud.public_id",
                 url : "mycloud.secure_url",
                //  public_id : mycloud.public_id,
                //  url : mycloud.secure_url,
              }
           });

           console.log('create course -',createCourse);
           res.status(201).json({ success: true,
                message : " Course Created ",
                createCourse,
           })

    } catch (error) {
        console.log('errors is-',error);
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


exports.GetFreeVideos = async(req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message: error.message
        })
    }
}

exports.RequestCourse = async(req,res) => {
    try {
        // const { name ,email ,description } = req.body;
        // console.log('request course body -',{name,email,description});

        // const course  = await Course.create({
        //     name,email,description
        // })

        // const to = process.env.MY_MAIL;
        // const subject = "Requesting for a course on CourseBundler";
        // const text = `I am ${name} and my Email is ${email}. \n${course}`;

        // await sendEmail(to, subject, text);

        // res.status(200).json({
        //     success: true,
        //     message: "Your Request Has Been Sent.",
        //   });


    } catch (error) {
        return res.status(500).json({
        success :false,
        message : error.message
        })
    }
}

exports.AddLecture = async(req,res) => {
    try {
        const { id } = req.params;      // passed in url as /course/34u534u534
        console.log('course id -',{id});

        const SpecifcCourse = await Course.findById(id);
        if(!SpecifcCourse){
            return res.status(404).json({
                success : false,
                message : error.message
            })
        }

        const { title ,description } = req.body;

        SpecifcCourse.lectures.push({
                title,
                description,
                video : {
                    public_id : "videpublci_id",
                    url : "public_id"
                 }
         })

        await SpecifcCourse.save();

        res.status(200).json({
            success : true,
            message : " Lecture is Added to Course ",
        })


    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

exports.DeleteLecture = async(req,res) => {
    try {
        const {  courseId , lectureId  } = req.query;
        
        const SpecificCourse = await Course.findById(courseId);

        if(!SpecificCourse){
            return res.status(404).json({message : " Course not Found "});
        }

        const findlecture =  SpecificCourse.lectures.find((item) => {
            if(item._id.toString() === lectureId.toString()) return item;
        })

        if(!findlecture){
            return res.status(404).json({message : " Lecture not Found "})
        }

        SpecificCourse.lectures = SpecificCourse.lectures.filter((item) => {
            if(item._id.toString() !== lectureId.toString()) return item;
        })

        await SpecificCourse.save();

        res.status(200).json({
            success: true,
            message: "Lecture Deleted Successfully Y!",
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.GetCourseLectures =  async(req,res) => {
    try {
        const { id } = req.params;

        const findCourse = await Course.findById(id);
        if(!findCourse){
            return res.status(404).json({
                success : false,
                message : "Course  not Existed"
            })
        }

        const AllLectures = findCourse.lectures;
        console.log('alllectures-',AllLectures);

        res.status(200).json({
            success : true,
            message : " All Lectures Fetched ",
            AllLectures
        })

    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

exports.DeleteCourse = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.BuySubscripton = async(req,res) => {
    try {
        const user = await User.findById(req.user._id);

         const instance = new Razorpay({
            key_id: 'rzp_test_VcpymMeDorzIgC',
            key_secret :'89WhuftkBjjTUdHQoSJXqxs3'
         });
         const subscription =  await instance.subscriptions.create({
            plan_id: "plan_NBFslY2lGfK3Db",
            customer_notify: 1,
            quantity: 5,
            total_count: 6,
        })
        console.log('subscription 11-',subscription);
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status; 

        await user.save();
        
        res.status(201).json({
            success : true,
            subscription : subscription.id,
        })

    } catch (error) {
        console.log('error in sub -',error);
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}