import React ,{ useEffect } from 'react'
import { useSelector  ,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { CourseLectures } from '../Actions/course.js' ;
import '../styles/App.css';

const MainCourse = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    console.log('params is --',{ id });       // course id 

     const  { Lectures }  = useSelector((state) => state.allusers);
     console.log('Lectures -',Lectures);

      useEffect(() => {
        dispatch(CourseLectures(id));
      }, [dispatch])

      const deleteLecture = (lectureid) => {
         console.log('lectureid -',lectureid);
      }

  return (
    <div>
       <div className = "lecture-container" style = {{padding:'5%'}}>
        <h1> Lectures Inside Courses </h1>
            {Lectures.length > 0  ? ( 
              Lectures.map(item =>  
                <div className = 'lectures-card' key = {item._id}>
                    <div className="first-side">
                      <h2>{item.title} </h2> 
                      <h2>{item.description} </h2> 
                        <video width="400" height="300" controls>
                            <source src = {item.video.url} type="video/mp4">
                            </source>
                        </video>
                    </div>
                    <div className="second-side">
                      <button id = "delete" onClick={() => deleteLecture(item._id)}> Delete </button>
                    </div>
                </div>
              )
            ) : (<>  No Lectures Present </>)}
       </div>
           </div>
  )
}

export default MainCourse