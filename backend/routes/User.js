const express = require('express');
const { Register, Login, Logout } = require('../Controllers/UserControllers.js');

const  router = express.Router();

router.route('/register').post(Register);

router.route('/login').post(Login);

router.route('/loggingout').get(Logout);

module.exports = router;