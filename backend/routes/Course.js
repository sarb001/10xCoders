const express = require('express');
const { CreateCourse, AllCourses, GetLoggedUserCourse, RequestCourse, AddLecture } = require('../Controllers/CourseController');
const { isAuthenticated } = require('../Middleware/auth');

const router = express.Router();

router.route('/createcourse').post(isAuthenticated,CreateCourse);

// add lectures in  Specifc  Course 

router.route('/course/:id').post(isAuthenticated,AddLecture);

router.route('/allcourse').get(AllCourses);

router.route('/mycourses').get(isAuthenticated, GetLoggedUserCourse);

router.route('/requestcourse').post(isAuthenticated, RequestCourse);

module.exports = router;