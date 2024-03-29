
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
            return res.status(401).json({
                success : false,
                message : " UnAuthorized User "
            })
        }

          const { title , price  , description  } = req.body;
          console.log('course title -',title);
          console.log('course price -',price);
          console.log('course desc -',description);
          
          if(!title || !price || !description){
              return res.status(400).json({
                  success  :  false,
                  message  : " Provide All Fieldsss "
                })
            }
                console.log('user id before -');
                const userid = req.user?._id;
                console.log('user id after -',userid);
                const user = await User.findById(userid);

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
            const convertdataUri = await ConvertFiletoUri(fileBuffer,OriginalName)

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
        // console.log('all courses backend- ',courses);
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
        console.log('inside getalluser course ');
        // console.log('req.body --',req);
        if(!req.user?._id){
            return res.status(401).json({message : " UnAuthorized "});    
          }

         const loggedUserid = req.user?._id;
         const user = await User.findById(loggedUserid);

            const newcourse = await Course.find({ creator : { 
                    $ne :  user
                } 
            }).populate('creator');

       return  res.status(200).json({
            success : true,
            message : " All Courses Fetched Successfully ",
            newcourse
        })
    } catch (error) {
        console.log('error in get al -',error);
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

          // find user inside  which is   equal to creator id(creator) 
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

            const user = req.user;
            const { id } = req.params;
            console.log(' _id for  BuyCourse -- ',id);

            const  course = await Course.findById(id);
            console.log('course price --',course.price);

             const order = await  instance.orders.create({
                amount : course.price * 100,
                currency : 'INR',
             });

             console.log('order in backend -',order);
            
             course.order.status = order.status;
             course.order.id = order.id;
             await course.save();
             console.log(' course  in  status ',order.status);
             console.log(' course  in  status ',order.id);

            return  res.status(200).json({
                success : true,
                message : "Get Details Course",
                order,
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


export const PaymentVerification = async(req,res) => {
    console.log('inside verificationn ');
    try {
        
        const { id } = req.params;
        console.log(' coursee _id for Course Payment  -- ',id);

        const course = await Course.findById(id);
            
        const { razorpay_payment_id , razorpay_order_id , razorpay_signature }  
        = req.body;

        if(!razorpay_payment_id || !razorpay_order_id || !razorpay_signature){
            return res.status(400).json({
                success : false,
                message : " Payment Verification Not Complete ",
            })
        }
                const user = await User.findById(req.user._id);

                console.log('razorpay payid -',  razorpay_payment_id);
                console.log('razorpay order id -',razorpay_order_id);
                console.log('razorpay signid from body -', razorpay_signature);

                const body = razorpay_order_id + "|" + razorpay_payment_id;
                const expectedsgnature = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString()).digest('hex');
                const isauth = expectedsgnature === razorpay_signature;

                console.log(' isAuth verified  ', isauth);

            if(isauth){
                 await Payment.create({
                     razorpay_order_id, razorpay_payment_id, razorpay_signature 
                 })
                 course.order.status = "paid";
                 await course?.save();
                 
                 console.log(' order paid done ');
                 console.log(' course in status -',course.order?.status);
                 console.log(' course in idd -',course.order?.id);
                    
                 const redirectedURl = `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`;
                 res.redirect(redirectedURl);

                 return course;
                }
                

                else{
                 return res.status(400).json({
                    success:false,
                    message:" Signature not Verified "
                    }); 
                }


    } catch (error) {
        console.log('error in sub -',error);
        return res.status(500).json({
                   success :false,
                   message : error.message
        })
    }
}


export const GetRazorPayKey = async(req,res) => {
    res.status(200).json({
        success :true,
        key :  process.env.RAZORPAY_KEY_ID
    })
}

