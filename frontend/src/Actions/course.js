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
        console.log('all courses 333  --',data.courses);
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

















// export const CreateCourse = (title,description,price,courseposter) => async(dispatch) => {
//     try {
//         dispatch({type:"GetCourseRequest"})
//         const data = await axios.post('/api/v1/createcourse', 
//         {title,description,price,courseposter},
//         {
//             headers:{
//                 'Content-Type' : 'application/json',
//             }
//         })
//         toast.success(' Course Created Successfully ');
//         dispatch({type:"GetCourseSuccess",payload : data.course});
//     } catch (error) {
//         toast.error(error.response.data.message);
//         dispatch({type:"GetCourseFailed" , payload : error.response.data.message })
//     }
// }


// export const AllLoggedUser = () => async(dispatch) => {
//     try {
//         dispatch({type:"MyCourseRequest"});

//         const data = await axios.get('/api/v1/mycourses',{
//             headers : {
//                 'Content-Type' : 'application/json',
//             }
//         })
//          console.log('data logged- ',data);
//         //  toast.success(' Courses Fetched ');
//         dispatch({type:"MyCourseSuccess",payload : data.users });
//     } catch (error) {
//         dispatch({type:"MyCourseFailed" , payload : error.response.data.message });
//     }
// }


// export const AllCourses = () => async(dispatch) => {
//     try {
//         dispatch({type:"AllCourseRequest"});

//         const data = await axios.get('/api/v1/allcourse',{
//             headers : {
//                 'Content-Type' : 'application/json',
//             }
//         })
//         console.log('All Courses Frontend --',data);
//         dispatch({type:"AllCourseSuccess",payload : data.courses });
//     } catch (error) {
//         dispatch({type:"AllCourseFailed"})
//     }
// }