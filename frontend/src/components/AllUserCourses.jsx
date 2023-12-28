import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllUsersCourses } from '../Actions/course';
import { LoadUser } from '../Actions/User';
import Sidebar from './Sidebar';

const AllUserCourses = () => {

   const {  courses  } = useSelector((state) => state.course);
   console.log('courses all user  -',courses);
   const  dispatch = useDispatch();

    useEffect(()=> {
      dispatch(AllUsersCourses());
      dispatch(LoadUser());
    },[dispatch])

  return (
  
  <div className="home container">
        <div className="left-section">
            <Sidebar />
        </div>
        <div className="right-section" style = {{margin:'5%'}}>
          <h2> My Specific User Cases  </h2>
        </div>
  </div>
  )
}

export default AllUserCourses