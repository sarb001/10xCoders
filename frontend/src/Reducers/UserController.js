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
        state.loading = false;
    },
    LoggedUserSuccess : (state,action) => {
        state.loading = false,
        state.user = action.payload
    },
    LoggedUserFailed : (state,action) => {
        state.loading = false,
        state.error  =  action.payload
    },

})