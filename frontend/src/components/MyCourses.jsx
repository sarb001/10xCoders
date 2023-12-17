import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector }  from 'react-redux' ;
import { DeleteMyCourse, MyAllCourses } from '../Actions/course';
import { Link } from 'react-router-dom';

const MyCourses = () => {
    const dispatch  = useDispatch();
    const { course , message } = useSelector(state => state.allusers);
    console.log('  myCourses all --', course );
    
    useEffect(() => {
      dispatch(MyAllCourses());
     },[dispatch])

    const deleteHandler = (courseid) => {
      console.log('courseid -',courseid);
      dispatch(DeleteMyCourse(courseid))
    }
  
  return (
        <div className="home container">
            <div className="left-section">
                <Sidebar />
            </div>
            <div className="right-section">
                <h3> My  All Courses </h3>
                {course?.map((item) => (
                    <div className = 'course-container' key = {item._id}>  
                       <span id = "img-container"  style = {{width:'100%',height:'50%'}}> 
                        <img src =  {item.courseposter.url}  style = {{width:'100%',borderRadius:'25px'}} />
                      </span>
                      <span id = "course-detail">
                        <span> {item.title} </span>
                        <span> {item.price} </span>
                        <div style = {{display:'grid',margin:'3%',gridTemplateColumns:'1fr 1fr'}}>
                          <span>
                          <Link to = {`/course/${item._id}`}>
                            <button className = "view-detail"> View Details </button>
                          </Link>
                          </span>
                         <button onClick={() => deleteHandler(item._id)}> Delete  Course  </button>
                        </div>
                      </span>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default MyCourses