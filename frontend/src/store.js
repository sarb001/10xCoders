import {     configureStore  } from '@reduxjs/toolkit' ;
import { userReducer } from './Reducers/UserReducer';
import { courseReducer, getcourseReducer } from './Reducers/CourseReducer';

const store = configureStore({
    reducer : {
        user   :   userReducer,
        course :   courseReducer,
        allusers  : getcourseReducer
    }
})

export default store 