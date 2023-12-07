const express = require('express');
const { CreateCourse, AllCourses } = require('../Controllers/CourseController');

const router = express.Router();

router.route('/createcourse').post(CreateCourse);

router.route('/allcourse').get(AllCourses);

module.exports = router;