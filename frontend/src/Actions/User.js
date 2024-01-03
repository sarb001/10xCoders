import axios from 'axios';
import  { toast } from 'react-toastify' ;

const BACKEND_URL = 'https://one0xcourses-backend.onrender.com'


export const userRegister = (name,email,password,profilepic) => async(dispatch) => {
    try {
        dispatch({type:"GetRegisterRequest"});
        const {data} = await axios.post(`${BACKEND_URL}/api/v1/register` ,
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
        
        const {data} = await axios.post(`${BACKEND_URL}/api/v1/login`,
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
        console.log('erron in actions -',error);
        dispatch({type:"LoggedUserFailed" , payload : error.response.data.message });
        return toast.error(error.response.data.message);
    }
}

export const Logout = () => async(dispatch) => {
    try {
        dispatch({type:"LogOutRequest"});
        const data = await axios.get("${BACKEND_URL}/api/v1/loggingout");
        console.log('loggedOut Data -',data);
        toast.success(' LoggedOut Successfully ');
        dispatch({type:"LogOutSuccess", payload : data.user});
    } catch (error) {
        dispatch({type:"LogOutFailed" , payload : error.response.data.message });
    }
}

export const LoadUser = () => async(dispatch) => {
    try {
        dispatch({type:"LoadUserRequest"});
        const {data} = await axios.get('${BACKEND_URL}/api/v1/me', {
            withCredentials: true
        });
        // console.log('loaded user-',{data});
        dispatch({type:"LoadUserSuccess" ,payload : data.user});

    } catch (error) {
        dispatch({type:"LoadUserFailed" , payload : error.response.data.message });
    }
}

export const BuyCourse  = (id) => async(dispatch) => {
    try {
        console.log('id in  action -',id);
        
        dispatch({type:"BuySpecificCourseRequest"});
        const {data} = await axios.get(`${BACKEND_URL}/api/v1/payment/${id}`, 
        {
          headers:{
             'Content-Type' : 'application/json',
         },
            withCredentials: true
        });
        console.log(' Buying Course here - ',{data});
        dispatch({type:"BuySpecificCourseSuccess" ,payload : data.course});

    } catch (error) {
        console.log('error in actions -',error);
        dispatch({type:"BuySpecificCourseFailed" , payload : error.response.data.message });
    }
}


export const PaymentVerification = (id) => async(dispatch) => {
    try {
            console.log(' course id in payment verify -',id);
            dispatch({type:"VerifyPaymentCourseRequest"});
            const {data} = await axios.post(`${BACKEND_URL}/api/v1/paymentverification/${id}`, 
            {
              headers:{
                 'Content-Type' : 'application/json',
             },
                withCredentials: true
            });
            console.log(' Buying Course here - ',{data});
            dispatch({type:"VerifyPaymentCourseSuccess" ,payload : data.course});
    } catch (error) {
        console.log('error in actions -',error);
        dispatch({type:"VerifyPaymentCourseFailed" , 
        payload : error.response.data.message });
    }
}