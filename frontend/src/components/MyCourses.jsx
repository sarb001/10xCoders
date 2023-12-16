import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector }  from 'react-redux' ;
import { MyAllCourses } from '../Actions/course';

const MyCourses = () => {
    const dispatch  = useDispatch();
    const { courses } = useSelector(state => state.allusers);
    console.log('  myCourses all --', courses );
    
    useEffect(() => {
      dispatch(MyAllCourses());
     },[dispatch])

  
  return (
        <div className="home container">
            <div className="left-section">
                <Sidebar />
            </div>
            <div className="right-section">
                    <h3> My  All Courses </h3>
            </div>
        </div>
  )
}

export default MyCourses