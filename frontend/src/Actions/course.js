import axios from "axios";
import { toast } from 'react-toastify' ;

export  const CreateCourse = (title,description,price,courseposter) => async(dispatch) => {
    try {
         dispatch({type:"CreateCourseRequest"});

         const data = await axios.post('/api/v1/createcourse',{
            title,description,price,courseposter
         },{
            headers:{
                'Content-Type' : 'application/json',
             }
         })
         console.log('create course - action -',data.message);
         toast.success(' Course Created Successfully ');
         dispatch({type:"CreateCourseSuccess",payload : data.message });

        } catch (error) {
            dispatch({type:"CreateCourseFailed" , payload: error.response.data.message });
        }
}

export const AllCourses = () => async(dispatch) => {
    try {
        dispatch({type:"AllCoursesRequest"});
        const { data } = await axios.get('/api/v1/allcourse',{
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


export const MyAllCourses = () => async(dispatch) => {
    try {
        dispatch({type:"MyCoursesRequest"});
        const { data } = await axios.get('/api/v1/mycourses',{
            headers : {
                'Content-Type' :  'application/json'
            }
        })
        console.log('mycourses --',data);
        dispatch({type:"MyCoursesSuccess",payload : data.course});
    } catch (error) {
        dispatch({type:"MyCoursesFailed" ,payload: error.response.data.message});
    }
}

export const CourseLectures = (id) => async(dispatch) => {
    try {
        dispatch({type:"CourseLecturesRequest"});

        const {data} = await axios.get(`/api/v1/course/${id}`,{
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
        const { data } = await axios.delete(`/api/v1/course/${id}`,{
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

export const AddMyLecture = (id,myForm) => async(dispatch) => {
    try {
        dispatch({type:"AddLectureRequest"});
        const { data } = await axios.post(`/api/v1/course/${id}`,{
            myForm
        },{
            headers: {
                'Content-Type' : 'multipart/form-data',
            },
            withCredentials : true,
        })
        console.log(' data in frontend -',{data});
        toast.success(' Lecture Added  ');
        dispatch({type:"AddLectureSuccess", payload : data.message });
    } catch (error) {
        console.log('error in frontend -',error);
        dispatch({type:"AddLectureFailed", 
        payload : error.response.data.message});
         toast.error(error.response.data.message);
    }
}


export const DeleteMyLecture = (courseId,lectureId) => async(dispatch) => {
    try {
        dispatch({type:"DeleteLectureRequest"});
        const { data } = await axios.delete(`/api/v1/lecture?courseId=${courseId}&lectureId=${lectureId}`,
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





