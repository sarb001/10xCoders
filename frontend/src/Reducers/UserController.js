import { createReducer  } from '@reduxjs/toolkit' ;

const initialState = {
}

export const  userReducer = createReducer(initialState,{
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

    LoggedUserRequest : (state,action) => {
        state.loading = true;
    },
    LoggedUserSuccess : (state,action) => {
        state.loading = false,
        state.user = action.payload
    },
    LoggedUserFailed : (state,action) => {
        state.loading = false,
        state.error  =  action.payload
    },

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


export const CourseReducer = createReducer(initialState,{
     GetCourseRequest : (state) => {
        state.loading = true
     },
     GetCourseSuccess : (state,action) => {
         state.loading = false,
         state.course = action.payload
     },
     GetCourseFailed : (state,action) => {
         state.loading = false,
         state.error  =  action.payload
     },
})