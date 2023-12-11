const express = require('express');
const { CreateCourse, AllCourses, GetLoggedUserCourse, RequestCourse, AddLecture, DeleteLecture, GetCourseLectures,  } = require('../Controllers/CourseController');
const { isAuthenticated } = require('../Middleware/auth');

const router = express.Router();

router.route('/createcourse').post(isAuthenticated,CreateCourse);

//  Add lectures in  Specifc  Course 
//  Update lecture 

router.route('/course/:id').post(isAuthenticated,AddLecture);

router.route('/course/:id').get(isAuthenticated,GetCourseLectures);

// Delete Lectuer 
router.route('/lecture').delete(isAuthenticated,DeleteLecture);

router.route('/allcourse').get(AllCourses);

router.route('/mycourses').get(isAuthenticated, GetLoggedUserCourse);

router.route('/requestcourse').post(isAuthenticated, RequestCourse);

module.exports = router;