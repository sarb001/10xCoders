const express = require('express');
const { CreateCourse, AllCourses, GetLoggedUserCourse } = require('../Controllers/CourseController');
const { isAuthenticated } = require('../Middleware/auth');

const router = express.Router();

router.route('/createcourse').post(isAuthenticated,CreateCourse);

router.route('/allcourse').get(AllCourses);

router.route('/mycourses').get(isAuthenticated, GetLoggedUserCourse);

module.exports = router;