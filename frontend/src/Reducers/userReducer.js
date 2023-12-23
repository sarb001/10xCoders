

import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({},{

    // Register Account 
    GetRegisterRequest : (state,action) => {
        state.loading = true
     },
     GetRegisterSuccess : (state,action) => {
         state.loading = false,
         state.user = action.payload;
         state.isAuthenticated = true;
     },
     GetRegisterFailed : (state,action) => {
         state.loading = false,
         state.isAuthenticated = false;
         state.error  =  action.payload
     },

     // Login Account 
     LoggedUserRequest : (state,action) => {
         state.loading = true;
     },
     LoggedUserSuccess : (state,action) => {
        state.loading = false,
        state.isAuthenticated = true;
        state.user = action.payload
     },
     LoggedUserFailed : (state,action) => {
         state.loading = false,
         state.isAuthenticated = false;
         state.error  =  action.payload
     },
     
     // Logout Account 
     LogOutRequest : (state,action) => {
         state.loading = false;
     },
     LogOutSuccess : (state,action) => {
         state.loading = false,
         state.isAuthenticated = false;
         state.user = null;
     },
     LogOutFailed : (state,action) => {
         state.loading = false,
         state.error  =  action.payload
         state.isAuthenticated = true;
     },

     LoadUserRequest : (state) => {
         state.loading = true
     }, 
     LoadUserSuccess : (state,action) => {
        state.loading = false,
        state.isAuthenticated = true;
        state.user = action.payload;
    },
     LoadUserFailed : (state,action) => {
        state.loading = false,
        state.error  =  action.payload
        state.isAuthenticated = false;
     },

     buySubscriptionRequest : (state) => {
        state.loading = true;
     },
     buySubscriptionSuccess : (state,action) => {
        state.loading = false;
        state.subscriptionId = action.payload;
     },
     buySubscriptionFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
     },

})
