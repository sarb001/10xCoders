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
        console.log('singuo actions -',error);
        dispatch({type:"GetRegisterFailed" , payload : error.response.data.message })
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
        toast.error(error.response.data.message);
        console.log('erron in actions -',error);
        dispatch({type:"LoggedUserFailed" , payload : error.response.data.message });
    }
}

export const Logout = () => async(dispatch) => {
    try {
        dispatch({type:"LogOutRequest"});
        const data = await axios.get("/api/v1/loggingout");
        console.log('loggedOut Data -',data);
        toast.success(' LoggedOut Successfully ');
        dispatch({type:"LogOutSuccess", payload : data.user});
    } catch (error) {
        dispatch({type:"LogOutFailed" , payload : error.response.data.message });
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
        toast.error(error.response.data.message);
        dispatch({type:"GetCourseFailed" , payload : error.response.data.message })
    }
}


export const AllLoggedUser = () => async(dispatch) => {
    try {
        dispatch({type:"MyCourseRequest"});

        const data = await axios.get('/api/v1/mycourses',{
            headers : {
                'Content-Type' : 'application/json',
            }
        })
         console.log('data logged- ',data);
        //  toast.success(' Courses Fetched ');
        dispatch({type:"MyCourseSuccess",payload : data.users });
    } catch (error) {
        dispatch({type:"MyCourseFailed" , payload : error.response.data.message });
    }
}