const express = require('express');
const { AllCourses, GetLoggedUserCourse, 
    RequestCourse, AddLecture,
 DeleteLecture, GetCourseLectures, DeleteCourse, 
 BuySubscripton, PaymentVerification,
  GetRazorPayKey, CancelSubscription, Createcourse  } = require('../Controllers/CourseController');
const { isAuthenticated, authorizeSubscribers } = require('../Middleware/auth');
const  singleUpload  = require('../Middleware/multer');

const router = express.Router();

router.route('/allcourse').get(AllCourses);

// Create Course 
router.route('/createcourse').post(isAuthenticated,Createcourse);

// Delete 
router.route('/course/:id').delete(isAuthenticated,DeleteCourse);

// Add Lecture
router.route('/course/:id').post(isAuthenticated ,singleUpload, AddLecture);

// Get All Course Lectures 
router.route('/course/:id').get(isAuthenticated,GetCourseLectures);

// Delete Lecture 
router.route('/lecture').delete(isAuthenticated,DeleteLecture);


// All Logged User Courses Present 
router.route('/mycourses').get(GetLoggedUserCourse);

// Request Course 
router.route('/requestcourse').post(isAuthenticated, RequestCourse);


router.route('/subscribe').get(isAuthenticated, BuySubscripton);

router.route('/paymentverification').get(isAuthenticated,PaymentVerification);

router.route('/razorpaykey').get(GetRazorPayKey);


/// must authorized as subscriber 

router.route('/cancelsubscription').get(isAuthenticated, authorizeSubscribers, CancelSubscription);

module.exports = router;