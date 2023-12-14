import {     configureStore  } from '@reduxjs/toolkit' ;
import { userReducer } from './Reducers/UserController.js';

export const store = configureStore({
    reducer : {
        user : userReducer,
    }
})