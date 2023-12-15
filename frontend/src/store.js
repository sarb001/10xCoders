import {     configureStore  } from '@reduxjs/toolkit' ;
import { CourseReducer , userReducer } from './Reducers/UserController.js';

export const store = configureStore({
    reducer : {
        user   :   userReducer,
        course :   CourseReducer,
    }
})