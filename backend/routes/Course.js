const express = require('express');
const { CreateCourse, AllCourses, GetLoggedUserCourse, RequestCourse, AddLecture, DeleteLecture, GetCourseLectures, DeleteCourse, BuySubscripton, PaymentVerification, GetRazorPayKey, CancelSubscription,  } = require('../Controllers/CourseController');
const { isAuthenticated } = require('../Middleware/auth');

const router = express.Router();

router.route('/allcourse').get(AllCourses);

// Create Course 
router.route('/createcourse').post(isAuthenticated,CreateCourse);

// Delete 
router.route('/course/:id').delete(isAuthenticated,DeleteCourse);


// Add Lecture
router.route('/course/:id').post(isAuthenticated,AddLecture);

// Get All Course Lectures 
router.route('/course/:id').get(isAuthenticated,GetCourseLectures);

// Delete Lecture 
router.route('/lecture').delete(isAuthenticated,DeleteLecture);


// All Logged User Courses Present 
router.route('/mycourses').get(isAuthenticated, GetLoggedUserCourse);

// Request Course 
router.route('/requestcourse').post(isAuthenticated, RequestCourse);


router.route('/subscribe').get(isAuthenticated, BuySubscripton);

router.route('/paymentverification').get(isAuthenticated,PaymentVerification);

router.route('/razorpaykey').get(GetRazorPayKey);

router.route('/cancelsubscription').get(isAuthenticated,CancelSubscription);

module.exports = router;