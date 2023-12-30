import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector }  from 'react-redux' ;
import { DeleteMyCourse, MyAllCourses } from '../Actions/course';
import { Link } from 'react-router-dom';
import '../styles/App.css' ;
import { LoadUser } from '../Actions/User';
import DashboardSidebar from './DashboardSidebar';

const MyCourses = ({user,isAuthenticated}) => {
   console.log('user course -',user);
    const dispatch  = useDispatch();
    const { courses , message } = useSelector(state => state.allusers);
    console.log('  myCourses all --', courses );
    
    useEffect(() => {
      dispatch(MyAllCourses());
      dispatch(LoadUser());
     },[dispatch])

    const deleteHandler = (courseid) => {
      console.log('courseid -',courseid);
      dispatch(DeleteMyCourse(courseid))
    }
  
  return (
        <div className="home secondcontainer">
            <div className="left-section">
                <div className="courselist">
                  
                  {courses?.map((item) => (
                      <div className = 'course-container' key = {item._id}> 
                          <img src =  {item.courseposter.url}  style = {{width:'100%', height:'220px',
                        objectFit:'cover',display:'block'
                        ,borderRadius:'25px'}} />
                    
                        <span id = "course-detail">
                          <span> Title - {item.title} </span>
                          <span> Price - {item.price} </span>
                          <span> Lectures - {item.lectures.length} </span>
                          <span> Creator - {item.creator.name} </span>
                          <div style = {{display:'grid',margin:'3%',gridTemplateColumns:'1fr 1fr'}}>
                            <span>
                            <Link to = {`/course/${item._id}`}>
                              <button className = "view-detail"> View Details </button>
                            </Link>
                            </span>
                          {/* <button onClick={() => deleteHandler(item._id)}> Delete  Course  </button> */}
                          </div>
                        </span>
                      </div>
                  ))}
                
                </div>
            </div>

            <div className="right-section">
                <h3> My  Total All Courses </h3>
                <DashboardSidebar />
            </div>
        </div>
  )
}

export default MyCourses