import {     configureStore  } from '@reduxjs/toolkit' ;
import { userReducer } from './Reducers/userReducer.js';
import { courseReducer, exceptloggedcourseReducer, getcourseReducer } from './Reducers/courseReducer.js';

const store = configureStore({
    reducer : {
        user   :   userReducer,
        course :   courseReducer,
        allusers  : getcourseReducer,
        usercourse : exceptloggedcourseReducer
    }
})

export default store 