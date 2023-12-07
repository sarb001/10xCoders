const express = require('express');
const { CreateCourse, AllCourses } = require('../Controllers/CourseController');
const { isAuthenticated } = require('../Middleware/auth');

const router = express.Router();

router.route('/createcourse').post(isAuthenticated,CreateCourse);

router.route('/allcourse').get(AllCourses);

module.exports = router;