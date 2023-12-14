import axios from 'axios';
import  { toast } from 'react-toastify' ;

export const userRegister = (name,email,password,profilepic) => async(dispatch) => {
    try {
        dispatch({type:"GetRegisterRequest"});
        const {data} = await axios.post(`/api/v1/register` ,
        {name,email,password,profilepic},
        {
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        console.log('data in -',{data});
        toast.success(' Registered Successfully ');
        dispatch({type:"GetRegisterSuccess",payload : data.user});
    } catch (error) {
        dispatch({type:"GetRegisterFailed"})
    }
}

export const LoginUser = (email,password) => async(dispatch) => {
    try {
        dispatch({type:"LoggedUserRequest"})
        
        const {data} = await axios.get(`/api/v1/login`,
        {email,password},
        {
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        console.log('data login -',{data});
        dispatch({type:"LoggedUserSuccess",payload : data.user})
    } catch (error) {
        dispatch({type:"LoggedUserFailed"})
    }
}