
import express from 'express';

import { Register, Login, Logout, MyProfile } from '../Controllers/UserControllers.js';

import { isAuthenticated } from '../Middleware/auth.js';

const  router = express.Router();

router.route('/register').post(Register);

router.route('/login').post(Login);

router.route('/loggingout').get(Logout);

router.route('/me').get(isAuthenticated,MyProfile);

export default router;