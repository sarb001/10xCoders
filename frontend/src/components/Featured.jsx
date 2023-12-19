import React, { useEffect } from 'react'
import '../styles/App.css' ;
import { Link } from 'react-router-dom' ;
import { useDispatch, useSelector } from 'react-redux';
import { AllCourses } from '../Actions/course';
import { LoadUser } from '../Actions/User';

const Featured = () => {

    const dispatch  = useDispatch();

    const { courses } = useSelector((state)  => state.allusers); 
    console.log('frontend courses - ',courses);

    useEffect(() => {
         dispatch(AllCourses());
         dispatch(LoadUser());
    },[dispatch])

  return (
     <div className="featured-section">
             <h2> Featured  </h2>
         <div className = "mainheader">

             <div className="courselist">
                {courses?.map((item) => (
                    <div className = 'course-container' key = {item._id}>  
                        <img src =  {item.courseposter.url}  
                        style = {{width:'100%', height:'220px',
                        objectFit:'cover',display:'block'
                        ,borderRadius:'25px'}} />

                      <span id = "course-detail">
                        <span> {item.title} </span>
                        <span> {item.price} </span>
                          <Link to = {`/course/${item._id}`}>
                            <button className = "view-detail"> View Details </button>
                          </Link>
                      </span>
                    </div>
                ))}
             </div>

         </div>
     </div>
  )
}

export default Featured