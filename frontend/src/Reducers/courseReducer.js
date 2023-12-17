import { createReducer } from "@reduxjs/toolkit"


export const courseReducer = createReducer({},{
      // create Course Request 

        CreateCourseRequest : (state,action)  => {
            state.loading = true;
        },
        CreateCourseSuccess : (state,action)  => {
            console.log(' before course - ',action.payload);
            state.loading = false;
            state.message = action.payload;
            console.log(' after course - ',action.payload);
        },
        CreateCourseFailed : (state,action)  => {
             state.loading = false;
        }
})

export const getcourseReducer = createReducer({
    courses: [],
},{   
        AllCoursesRequest : (state,action) => {
            state.loading = true;
        },
        AllCoursesSuccess : (state,action) => {
            console.log('all courses before success -',action.payload);
            state.loading = false;
            state.courses = action.payload;
            console.log('all courses after  ssuccess -',action.payload);
        },
        AllCoursesFailed : (state,action) => {
           state.loading = false;
       },

       // users

        MyCoursesRequest : (state,action) => {
            state.loading = true;
        },
        MyCoursesSuccess : (state,action) => {
            console.log('My courses before success -',action.payload);
            state.loading = false;
            state.course = action.payload;
            console.log('My courses after  ssuccess -',action.payload);
        },
        MyCoursesFailed : (state,action) => {
        state.loading = false;
    },
})