
import express from 'express';
import {  AllCourses, GetLoggedUserCourse, 
  RequestCourse, AddLecture,
DeleteLecture, GetCourseLectures, DeleteCourse,
 Createcourse, GetAllUserCourses, BuyCourse, PaymentVerification, GetRazorPayKey } from '../Controllers/CourseController.js';

import { isAuthenticated  } from '../Middleware/auth.js';
import singleUpload from '../Middleware/multer.js';

const router = express.Router();

// get all courses 
router.route('/allcourse').get(AllCourses);

//get  logged user courses 
router.route('/mycourses').get(isAuthenticated  , GetLoggedUserCourse);


//get users all courses 
router.route('/usercourses').get(isAuthenticated  , GetAllUserCourses);

// Create Course 
router.route('/createcourse').post(isAuthenticated,singleUpload,Createcourse);

// Delete 
router.route('/course/:id').delete(isAuthenticated,DeleteCourse);

// Add Lecture
router.route('/course/:id').post(isAuthenticated ,singleUpload, AddLecture);

// Get All Course Lectures 
router.route('/course/:id').get(isAuthenticated , GetCourseLectures);

// Delete Lecture 
router.route('/lecture').delete(isAuthenticated,DeleteLecture);


// Request Course 
router.route('/requestcourse').post(isAuthenticated, RequestCourse);


router.route('/payment/:id').get(isAuthenticated  ,BuyCourse);


router.route('/paymentverification/:id').post(isAuthenticated  ,PaymentVerification);


router.route('/razorpaykey').get(isAuthenticated,GetRazorPayKey);


export default router;