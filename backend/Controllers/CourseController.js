const Razorpay = require('razorpay');
const Course = require('../models/Course.js');
const User = require('../models/User.js');
const cloudinary = require('cloudinary');
const instance   = require('../server.js');
const Payment = require('../models/Payment.js');
const  getDataUri  = require('../DataUri.js');

exports.Createcourse = async(req,res) => {
    try {
          if(!req.user){
            return res.status(401).json({message : " UnAuthorized "});    
          }

           const user = await User.findById(req.user._id);

           const { title , price  , description ,courseposter } = req.body;
           if(!title || !price || !description){
            return res.status(400).json({
                success  :  false,
                message  : " Provide All Fields "
            })
           }

            const mycloud = await cloudinary.v2.uploader.upload(courseposter, {
                folder : "courseimages"
            })

           const course = await Course.create({
              title,
              price,
              description,
              creator : req?.user._id,
              courseposter : {
                 public_id : mycloud.public_id,
                 url : mycloud.secure_url,
              }
           });

             user?.courselist.push(course._id);
             await user.save();
             res.status(201).json({ 
                    success: true,
                    message : " Course Created  ,You can Add Lectures Now ",
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
        const courses = await Course.find({});
        console.log('all courses- ',courses);
        res.status(200).json({
            success : true,
            message : " All Courses Fetched Successfully ",
            courses
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
          const courses = await Course.find({
             creator : {
                 $in : user
             }
          })

            console.log("courses backend --",courses);
            await user.save();
            return res.status(200).json({
                success :true,
                courses
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
        const { id } = req.params;           // passed in url as /course/34u534u534
        const { title ,description  } = req.body;

        const course = await Course.findById(id);
        if(!course){
            return res.status(404).json({
                success : false,
                message : error.message
            })
        }

        const file = req.file;
        const fileUri = getDataUri(file);

         const mycloud = await cloudinary.v2.uploader.upload(fileUri.content ,{
            resource_type : "video",
            folder : 'lecture_videos',
         })

        course.lectures.push({
                title,
                description,
                video : {
                    public_id : mycloud.public_id,
                    url : mycloud.secure_url,
                 }
         })

        await course.save();
        res.status(200).json({
            success : true,
            message : " Lecture Added in Course ",
            course 
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
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret :process.env.RAZORPAY_KEY_SECRET
         });
         const subscription =  await instance.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
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

exports.PaymentVerification = async(req,res) => {
    try {
        const { razorpay_payment_id , razorpay_order_id , razorpay_signature}  = req.body;

        const user = await User.findById(req.user._id);
        const  subscription_id = user.subscriptions.id;

        const generated_signature = crypto
        .createHmac('sha256' ,process.env.API_SECRET)
        .update(razorpay_payment_id +"|"+subscription_id,"utf-8")
        .digest("hex");

        const isAuthentic = generated_signature === razorpay_signature;
        console.log('isAuthentic -',isAuthentic);

        if(!isAuthentic){
            return res.redirect(`${fronteurl}/paymentfailed`);
        }
        await Payment.create({
            razorpay_signature,
            razorpay_payment_id,
            razorpay_subscription_id,
        });
        
        user.subscription.status = "active";
        await user.save();
        
        return res.redirect(`${frontedurl}/paymentsuccess?reference=${razorpay_payment_id}`);

    } catch (error) {
        return res.status(500).json({
            success  : false,
            message  : error.message 
        })
    }
}

exports.GetRazorPayKey = async(req,res) => {
    res.status(200).json({
        success :true,
        key :  process.env.API_KEY
    })
}

exports.CancelSubscription = async(req,res) => {
    try {
        const user = await User.findById(req.user._id);

        const subscriptionId = user.subscription.id;
        let refund = false;

        await instance.subscription.cancel(subscriptionId);
        const  payment = await Payment.findOne({
            razorpay_subscription_id : subscriptionId,
        })
        const subscribedTime = Date.now()  - payment.createdAt;
        const refundTime = 7 * 24 * 60 * 60 * 1000;

            // 7 > 2 (its  now 2 days since i subscribed )
        if(refundTime > subscribedTime){
             await instance.payments.refund(payment.razorpay_payment_id);
             refund = true;
             // refunding  money now 
        } 

        await payment.remove();
        user.subscription.id = undefined;
        user.subscription.status = undefined;
        await user.save();

        res.status(200).json({
            success  : true,
            message : 
            refund ? 
            "  Subs Cancelled , Yes Refunding Money in 7 Days  Now " : 
            "  Subs  Cancelled ,  Money will be deducted in 3 hrs "
        })

    } catch (error) {
        
    }
}