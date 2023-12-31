
import Razorpay from 'razorpay';
import Course from '../models/Course.js';
import User from '../models/User.js';
import cloudinary from 'cloudinary';
import Payment from '../models/Payment.js';
import path from 'path';
import DataUri from 'datauri/parser.js';
import { instance } from '../server.js';
import crypto from 'crypto';


export const Createcourse  = async(req,res) => {
    try {
          if(!req.user){
            return res.status(401).json({message : " UnAuthorized "});    
          }

          const { title , price  , description  } = req.body;
          console.log('course title -',title);
          console.log('course price -',price);
          console.log('course desc -',description);
          //   console.log('requested bodyy  -',req.body);
          
          if(!title || !price || !description){
              return res.status(400).json({
                  success  :  false,
                  message  : " Provide All Fieldsss "
                })
            }
            const user = await User.findById(req.user._id);

               const  file = req.file;
               console.log('file backend --',file);
              if(!file || !file.originalname){
                throw new Error(' Invalid File Obejctt ');
               }

               async function ConvertFiletoUri(fileBuffer,originalname){
                   try {
                        const datauri = new DataUri();
                        const dataUri = datauri.format(path.extname(originalname),fileBuffer);
                        return dataUri.content;

                    } catch (error) {
                        console.log('error is-',error);
                    }
               }

            const fileBuffer     = req.file.buffer;
            const OriginalName   = req.file?.originalname;
            const convertdataUri = await ConvertFiletoUri(fileBuffer,OriginalName);


            const mycloud = await cloudinary.v2.uploader.upload(convertdataUri,{
                folder : "courseimages"
            })
            console.log('myclud --',mycloud);

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

export const AllCourses    = async(req,res) => {
    try {
        const courses = await Course.find({}).populate('creator');
        console.log('all courses backend- ',courses);
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

export const GetAllUserCourses    = async(req,res) => {
    try {
         if(!req.user){
            return res.status(401).json({message : " UnAuthorized "});
         }

         const loggedUserid = req.user._id;
         const user = await User.findById(loggedUserid);

            // except (neglect) user     and        get all user 
        const courses = await Course.find({ creator : { 
                $ne :  user
            } 
        }).populate('creator');
        console.log('all courses backend except - ',courses);

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

export const GetLoggedUserCourse = async(req,res) => {
    try {
        if(!req.user){
            return res.status(401).json({message : " UnAuthorized "});    
          }

          const loggeduser = req.user._id;
          const user = await User.findById(loggeduser);

          // find user inside  which is   equal to creator id 
          const courses = await Course.find({
             creator : {
                 $in : user
             }
          }).populate('creator');

            console.log("mycourses backend --",courses);
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

export const GetFreeVideos = async(req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message: error.message
        })
    }
}

export const RequestCourse = async(req,res) => {
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

export const AddLecture = async(req,res) => {
    try {
        const { id } = req.params;           // passed in url as /course/34u534u534
        const {title,description} = req.body;
        console.log('backend body 11 --',title,description);
        
        console.log('requested Body title --',req.body.title);
        console.log('requested Body description  --',req.body.description);

        console.log('requested Body 22--',req.body);
        const course = await Course.findById(id);

        if(!course){
            return res.status(404).json({
                success : false,
                message : error.message
            })
        }

       
        const file = req.file;
        console.log('file iss -',file);
        
        if(!file){
            return res.status(400).json({
                success : false,
                message : "No Files Uploadedddd"
            })
         }
       
        async function ConvertFiletoUri(fileBuffer,originalname){
            try {
                 const datauri = new DataUri();
                 const dataUri = datauri.format(path.extname(originalname),fileBuffer);
                 return dataUri.content;

             } catch (error) {
                 console.log('error is-',error);
             }
        }

        const fileBuffer     = req.file.buffer;
        const OriginalName   = req.file?.originalname;
        const convertdataUri = await ConvertFiletoUri(fileBuffer,OriginalName);

         const mycloud = await cloudinary.v2.uploader.upload(convertdataUri,{
            resource_type : "video",
            folder : 'lecture_videos',
         });

        course.lectures.push({
                title,
                description,
                video : {
                    public_id : mycloud.public_id,
                    url : mycloud.secure_url,
                 }
         })

        await course.save();
        console.log('lecture added -',course);
        
        res.status(200).json({
            success : true,
            message : " Lecture Added in Course ",
            course 
        })
        console.log('backend done--');

    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

export const DeleteLecture = async(req,res) => {
    try {
        const {  courseId , lectureId  } = req.query;
        
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({message : " Course not Found "});
        }

        const findlecture =  course.lectures.find((item) => {
            if(item._id.toString() === lectureId.toString()) return item;
        })

        if(!findlecture){
            return res.status(404).json({message : " Lecture not Found "})
        }

        course.lectures = course.lectures.filter((item) => {
            if(item._id.toString() !== lectureId.toString()) return item;
        })

        await course.save();

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

export const GetCourseLectures =  async(req,res) => {
    try {
        const { id } = req.params;

        const findCourse = await Course.findById(id);
        if(!findCourse){
            return res.status(404).json({
                success : false,
                message : "Course  not Existed"
            })
        }

        const Lectures = findCourse.lectures;

        res.status(200).json({
            success : true,
            message : " All Lectures Fetched ",
            Lectures
        })

    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

export const DeleteCourse = async(req,res) => {
    try {
       const {id} = req.params;
       
       const course = await Course.findById(id);
       
        if(!course){
             return res.status(404).json({
                success : false,
                message : "Course  not Found"
            })
        }
       await cloudinary.v2.uploader.destroy(course.courseposter.public_id);
        
       // lectures destroy 
       for (let i = 0; i < course.lectures.length; i++) {
          const singleLecture = course.lectures[i];
          await cloudinary.v2.uploader.destroy(singleLecture?.video.public_id ,{
             resource_type : "video",
          })
        }
         await course.deleteOne();
         res.status(200).json({
            success :true,
            message : " Course Removed Successfully "
         })

    } catch (error) {
        return res.status(500).json({
            success :false,
            message : error.message
        })
    }
}


export const BuyCourse =  async(req,res) => {
    try {
            if(!req.user){
                return res.status(401).json({message : " UnAuthorized "});
            }

            const { id } = req.params;
            console.log(' _id for  BuyCourse -- ',id);

            const  course = await Course.findById(id);
            console.log('course price --',course.price);

             const order = await  instance.orders.create({
                amount : course.price * 100,
                currency : 'INR',
             });

            console.log('order in backend -',order);

            return  res.status(200).json({
                success : true,
                message : "Get Details Course",
                course, 
            })

    } catch (error) {
        console.log('error in sub -',error);
         return res.status(500).json({
                    success :false,
                    message : error.message
        })
    }
}








// export const BuySubscripton = async(req,res) => {
//     try {
//         const user = await User.findById(req.user._id).populate('courselist');
//         const  { id } = req.params;
//         console.log('id in params -',{id});
        
//          console.log('userrr subsc-',user);
//         // const getcourseid = user.courselist.populate('_id');
//         // console.log('fullcourse -',getcourseid);

//          const instance = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret :process.env.RAZORPAY_KEY_SECRET
//          });
         
//          const order  =  await instance.orders.create({
//             // amount : 
//             plan_id: process.env.RAZORPAY_PLAN_ID,
//             customer_notify: 1,
//             quantity: 5,
//             total_count: 6,
//         })
//         console.log('subscription created-- -',subscription);
//         user.subscription.id = subscription.id;
//         user.subscription.status = subscription.status; 

//         await user.save();
        
//         res.status(201).json({
//             success : true,
//             subscriptionId : subscription.id,
//         })

//     } catch (error) {
//         console.log('error in sub -',error);
//         return res.status(500).json({
//             success :false,
//             message : error.message
//         })
//     }
// }

// export const PaymentVerification = async(req,res) => {
//     try {
//          console.log('insde verification -');
//         const { razorpay_payment_id , razorpay_subscription_id , razorpay_signature }  = req.body;
        
//         console.log('razorpay payid -',  razorpay_payment_id);
//         console.log('razorpay subssid -',razorpay_subscription_id);
//         console.log('razorpay signid -', razorpay_signature);

//         const user = await User.findById(req.user._id);
//         console.log('user found --',user);
        
//         const  subscription_id = user.subscription.id;
//         console.log('verification started',subscription_id);

//         const generated_signature = crypto.createHmac('sha256' ,
//         process.env.RAZORPAY_KEY_SECRET).update(razorpay_payment_id + "|" +subscription_id,"utf-8").digest("hex");
        
//         console.log('razorpay signid  -', razorpay_signature);
//         console.log('generated sign  --',generated_signature);

//         const isAuthentic = generated_signature === razorpay_signature;
//         console.log('isAuthentic cce -',isAuthentic);

//         if(!isAuthentic){
//              return  res.status(500).json({
//              success : false,
//              message : " Payment Failed "
//              })
//             // return res.redirect(`${fronteurl}/paymentfailed`);
//         }
//         await Payment.create({
//             razorpay_signature,
//             razorpay_payment_id,
//             razorpay_subscription_id,
//         });
        
//         user.subscription.status = "active";
//         await user.save();
//         console.log('subs done');
//         res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
//         // return res.redirect(``);

//     } catch (error) {
//         console.log('error in verify-',error);
//         return res.status(500).json({
//             success  : false,
//             message  : error.message 
//         })
//     }
// }

// export const GetRazorPayKey = async(req,res) => {
//     res.status(200).json({
//         success :true,
//         key :  process.env.API_KEY
//     })
// }

// export const CancelSubscription = async(req,res) => {
//     try {
//         const { id } = req.params;              // subscription_id -- to cancel
//         console.log('backend cancel id -',id);

//         const user = await User.findById(req.user._id);
//         console.log('logged user-',user);

//         // id - subscription_id passed
//         // user.subs.id - output of subs stored in user

//         if(id ===   user.subscription.id){
//             console.log('subs cancelled -');
//         }else{
//             console.log('subs NOTTTT cancelled -');
//         }

//         const subscriptionId = user.subscription.id;            // 68Tr 
//         console.log('subs  id -',subscriptionId);
//         let refund = false;

//         console.log('before payment');
//         const currentSubscription = await instance.subscriptions.fetch(id);
//     if (currentSubscription.status === 'cancelled') {
//             console.log('Subscription already cancelled');
//             // Handle already cancelled subscription (e.g., return a message to the user)
//            res.status(400).json({ success: false, message: 'Subscription is already cancelled.' });
//     }
    
//         //  const res = await instance.subscriptions.cancel(subscriptionId,false);

//          console.log('after payment');
//         //  console.log('after payment res -',res);
//         console.log('id is -',id);
//         const  payment = await Payment.findOne({
//             razorpay_subscription_id 
//         });
//         console.log('paymennt is 1 -',payment);
//         if (!payment) {
//             return res.status(404).json({ success: false, message: 'Payment not found' });
//           }

//         const subscribedTime = Date.now()  - payment.createdAt;
//         const refundTime = 7 * 24 * 60 * 60 * 1000;

//             // 7 > 2 (its  now 2 days since i subscribed )
//         if(refundTime > subscribedTime){
//              await instance.payments.refund(payment.razorpay_payment_id);
//              refund = true;
//              // refunding  money now 
//         } 

//         await payment.remove();
//         user.subscription.id = undefined;
//         user.subscription.status = undefined;
//         await user.save();
//         console.log('atlast end--');
//        return res.status(200).json({
//             success  : true,
//             message :  refund ? 
//             "  Subscription  Cancelled ,  You will recieve full refund  within 7 days " : 
//             "  Subscription  Cancelled ,  Money will be deducted in as Subscription  was cancelled after 7 days "
//         })

//     } catch (error) {
//         console.log('cancel error',error);
//         res.status(500).json({
//             success  : false,
//             message : " Failed to Cancel Subscription"
//         })
//     }
// }