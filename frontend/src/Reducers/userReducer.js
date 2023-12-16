

import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({},{

    // Register Account 
    GetRegisterRequest : (state,action) => {
        state.loading = true
     },
     GetRegisterSuccess : (state,action) => {
         state.loading = false,
         state.user = action.payload
     },
     GetRegisterFailed : (state,action) => {
         state.loading = false,
         state.error  =  action.payload
     },

     // Login Account 
     LoggedUserRequest : (state,action) => {
         state.loading = true;
     },
     LoggedUserSuccess : (state,action) => {
        console.log('logged  user before -',action.payload);
        state.loading = false,
        state.user = action.payload
        console.log('logged  user afterr -',action.payload);
     },
     LoggedUserFailed : (state,action) => {
         state.loading = false,
         state.error  =  action.payload
     },
     
     // Logout Account 
     LogOutRequest : (state,action) => {
         state.loading = false;
     },
     LogOutSuccess : (state,action) => {
         state.loading = false,
         state.user = null;
     },
     LogOutFailed : (state,action) => {
         state.loading = false,
         state.error  =  action.payload
     },
})
