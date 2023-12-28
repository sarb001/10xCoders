
import express from 'express';
import {  AllCourses, GetLoggedUserCourse, 
  RequestCourse, AddLecture,
DeleteLecture, GetCourseLectures, DeleteCourse, 
BuySubscripton, PaymentVerification,
GetRazorPayKey, CancelSubscription, Createcourse } from '../Controllers/CourseController.js';

import { isAuthenticated, authorizeSubscribers } from '../Middleware/auth.js';
import singleUpload from '../Middleware/multer.js';

const router = express.Router();

router.route('/allcourse').get(AllCourses);

// Create Course 
router.route('/createcourse').post(isAuthenticated,singleUpload,Createcourse);

// Delete 
router.route('/course/:id').delete(isAuthenticated,DeleteCourse);

// Add Lecture
router.route('/course/:id').post(isAuthenticated ,singleUpload, AddLecture);

// Get All Course Lectures 
router.route('/course/:id').get(isAuthenticated,GetCourseLectures);

// Delete Lecture 
router.route('/lecture').delete(isAuthenticated,DeleteLecture);


// All Logged User Courses Present 
router.route('/mycourses').get(isAuthenticated  , GetLoggedUserCourse);

// Request Course 
router.route('/requestcourse').post(isAuthenticated, RequestCourse);


router.route('/subscribe').get(isAuthenticated, BuySubscripton);

router.route('/paymentverification').post(isAuthenticated,PaymentVerification);

router.route('/razorpaykey').get(isAuthenticated,GetRazorPayKey);


/// must authorized as subscriber 

router.route('/cancelsubscription/:id').post(isAuthenticated, authorizeSubscribers, CancelSubscription);

export default router;