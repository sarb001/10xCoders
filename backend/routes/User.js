const express = require('express');
const { Register, Login, Logout, MyProfile } = require('../Controllers/UserControllers.js');
const { isAuthenticated } = require('../Middleware/auth.js');

const  router = express.Router();

router.route('/register').post(Register);

router.route('/login').post(Login);

router.route('/loggingout').get(Logout);

router.route('/me').get(isAuthenticated,MyProfile);


module.exports = router;