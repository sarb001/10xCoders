import {     configureStore  } from '@reduxjs/toolkit' ;
import { userReducer } from './Reducers/UserController';

export const store = configureStore({
    user : userReducer,
})