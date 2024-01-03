import axios from "axios";
import { toast } from 'react-toastify' ;


const BACKEND_URL = 'https://one0xcourses-backend.onrender.com'


export  const CreateCourse = (myForm) => async(dispatch) => {
    try {
         dispatch({type:"CreateCourseRequest"});
         console.log(' myForm frontend --',myForm);
         const data = await axios.post('${BACKEND_URL}/api/v1/createcourse', myForm
         ,{
            headers:{
                'Content-Type' : 'multipart/form-data',
             },
             withCredentials : true
         })
         console.log('create course - action -',data.message);
         toast.success(' Course Created Successfully ');
         dispatch({type:"CreateCourseSuccess",payload : data.message });
         
        } catch (error) {
            console.log('error in course -',error);
            toast.error(error);
            dispatch({type:"CreateCourseFailed" , payload: error.response.data.message });
        }
}

export const AllCourses = () => async(dispatch) => {
    try {
        dispatch({type:"AllCoursesRequest"});
        const { data } = await axios.get('${BACKEND_URL}/api/v1/allcourse',{
            headers : {
                'Content-Type' :  'application/json'
            }
        })
        console.log('all courses   --',data.courses);
        dispatch({type:"AllCoursesSuccess" ,payload : data.courses});

    } catch (error) {
        dispatch({type:"AllCoursesFailed" ,payload: error.response.data.message})
    }
}

// my all courses
export const MyAllCourses = () => async(dispatch) => {
    try {
        dispatch({type:"MyCoursesRequest"});
        const { data } = await axios.get('${BACKEND_URL}/api/v1/mycourses',{
            headers : {
                'Content-Type' :  'application/json'
            }
        })
        console.log('mycourses --',data);
        dispatch({type:"MyCoursesSuccess",payload : data.courses});
    } catch (error) {
        dispatch({type:"MyCoursesFailed" ,payload: error.response.data.message});
    }
}

// all user's  courses except 
export const AllUsersCourses = () => async(dispatch) => {
    try {
        dispatch({type:"AllUsersCoursesRequest"});
        const { data } = await axios.get('${BACKEND_URL}/api/v1/usercourses',{
            headers : {
                'Content-Type' :  'application/json'
            }
        })
        console.log(' user data except course  --',data.courses);
        dispatch({type:"AllUsersCoursesSuccess" ,payload : data.courses});

    } catch (error) {
        dispatch({type:"AllUsersCoursesFailed" ,payload: error.response.data.message})
    }
}

export const CourseLectures = (id) => async(dispatch) => {
    try {
        dispatch({type:"CourseLecturesRequest"});

        const {data} = await axios.get(`${BACKEND_URL}/api/v1/course/${id}`,{
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        console.log('course lectures 11-',{data});
        dispatch({type:"CourseLecturesSuccess" , payload : data.Lectures });
    } catch (error) {
        dispatch({type:"CourseLecturesFailed"});
    }
}

export const DeleteMyCourse = (id) => async(dispatch) => {
    try {
        dispatch({type:"DeleteCourseRequest"});
        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/course/${id}`,{
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        console.log('delete  data course -',{data});
        dispatch({type:"DeleteCourseSuccess", payload : data.message });
    } catch (error) {
        dispatch({type:"DeleteCourseFailed"});
    }
}

export const AddMyLecture = (id,formdata) => async(dispatch) => {
    try {
        dispatch({type:"AddLectureRequest"});
        const { data } = await axios.post(`${BACKEND_URL}/api/v1/course/${id}`,
            formdata,{
            headers: {
                'Content-Type' : 'multipart/form-data',
            },
            withCredentials : true,
        })
        toast.success(' Lecture Added  ');
        dispatch({type:"AddLectureSuccess", payload : data.message });
    } catch (error) {
        dispatch({type:"AddLectureFailed", 
        payload : error.response.data.message});
         toast.error(error.response.data.message);
    }
}


export const DeleteMyLecture = (courseId,lectureId) => async(dispatch) => {
    try {
        dispatch({type:"DeleteLectureRequest"});
        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/lecture?courseId=${courseId}&lectureId=${lectureId}`,
        {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        console.log('delete  data Lecture -',{data});
        toast.success(' Lecture Deleted Successfully ');
        dispatch({type:"DeleteLectureSuccess", payload : data.message });
    } catch (error) {
        toast.error(error);
        dispatch({type:"DeleteLectureFailed" , 
        payload : error.response.data.message});
    }
}





