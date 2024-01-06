import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    loading : true,
    courses: [],
    Lectures : [],
    newcourse : []
}


export const courseReducer = createReducer(initialState,{
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
        },
})

export const getcourseReducer = createReducer(initialState,
{   
            AllCoursesRequest : (state,action) => {
                state.loading = true;
                console.log('all courses loading  1 -',state.loading);
            },
            AllCoursesSuccess : (state,action) => {
                console.log('all courses before success -',action.payload);
                console.log('all courses loading  2 -',state.loading);
                state.loading = false;
                state.courses = action.payload;
                console.log('all courses after  ssuccess -',action.payload);
            },
            AllCoursesFailed : (state,action) => {
                console.log('all courses loading  3 -',state.loading);
                state.loading = false;
            },
       // users

            MyCoursesRequest : (state,action) => {
                state.loading = true;
            },
            MyCoursesSuccess : (state,action) => {
                state.loading = false;
                state.courses = action.payload;
            },
            MyCoursesFailed : (state,action) => {
                state.loading = false;
            },


         //all Lectures of Course

            CourseLecturesRequest : (state,action) => {
                state.loading = true;
            },
            CourseLecturesSuccess : (state,action) => {
             state.loading = false;
             state.Lectures = action.payload;
            },
            CourseLecturesFailed : (state,action) => {
             state.loading = false;
            },

            // Delete Course

            DeleteCourseRequest : (state,action) => {
                state.loading = true;
            },
            DeleteCourseSuccess : (state,action) => {
             state.loading = false;
             state.message = action.payload;
            },
            DeleteCourseFailed : (state,action) => {
               state.loading = false;
            },

            //     // Add Lecture 
            AddLectureRequest : (state,action)  => {
                state.loading = true;
            },
            AddLectureSuccess : (state,action)  => {
                state.loading = false;
                state.message = action.payload;
            },
            AddLectureFailed : (state,action)  => {
                state.loading = false;
            },

                //Delete Lecture        
            DeleteLectureRequest : (state,action)  => {
                state.loading = true;
            },
            DeleteLectureSuccess : (state,action)  => {
                state.loading = false;
                state.message = action.payload;
            },
            DeleteLectureFailed : (state,action)  => {
                state.loading = false;
            }
})

export const exceptloggedcourseReducer = createReducer(initialState,{
    // all Users RequestCourses 
    AllUsersCoursesRequest : (state) => {
        state.loading = true;
        console.log('expect reducer before 1- ',  state.loading);
    },
    AllUsersCoursesSuccess : (state,action) => {
        console.log('expect reducer before- ',action.payload);
        console.log('expect reducer 2 - ',  state.loading);
        state.loading = false;
        state.newcourse = action.payload;
        console.log('expect reducer after - ',action.payload);
    },
    AllUsersCoursesFailed : (state) => {
        console.log('expect reducer 3- ',state.loading);
        state.loading = false;
    },
})