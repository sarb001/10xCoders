import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector }  from 'react-redux' ;
import { AllLoggedUser } from '../Actions/User';

const MyCourses = () => {
    const dispatch  = useDispatch();
    // const usersall = useSelector(state => state.users);
    // console.log('users all1--',{usersall});
    
    useEffect(() => {
      dispatch(AllLoggedUser());
      console.log('mycourses --');
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