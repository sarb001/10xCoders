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
        
        const {data} = await axios.post(`/api/v1/login`,
        {email,password},
        {
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        console.log('data login -',{data});
        toast.success(' LoggedIn Successfully ');
        dispatch({type:"LoggedUserSuccess",payload : data.user});

    } catch (error) {
        dispatch({type:"LoggedUserFailed"})
    }
}

export const Logout = () => async(dispatch) => {
    try {
        dispatch({type:"LogOutRequest"});
        const data = await axios.get("/api/v1/logout");
        console.log('loggedOut Data -',data);
        toast.success(' LoggedOut Successfully ');
        dispatch({type:"LogOutSuccess",payload : data.user});
    } catch (error) {
        dispatch({type:"LogOutFailed"});
    }
}

export const CreateCourse = (title,description,price,courseposter) => async(dispatch) => {
    try {
        dispatch({type:"GetCourseRequest"})
        const data = await axios.post('/api/v1/createcourse', 
        {title,description,price,courseposter},
        {
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        toast.success(' Course Created Successfully ');
        dispatch({type:"GetCourseSuccess",payload : data.course});
    } catch (error) {
        dispatch({type:"GetCourseFailed"})
    }
}
