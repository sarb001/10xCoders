import React, { useEffect } from 'react'
import Sidebar from '../Sidebar';
import  '../../styles/App.css' ;
import Featured from '../Featured';
import Freevideos from '../Freevideos';
import { useSelector  ,useDispatch } from 'react-redux' ;
import { AllCourses } from '../../Actions/course';
import { LoadUser } from '../../Actions/User';


const Courses = ({ user,isAuthenticated }) => {
     const dispatch  = useDispatch();
    useEffect(() => {
        dispatch(LoadUser());
    },[dispatch])

  return (
    <div className="container">
        <div className="left-section">
           <Sidebar />
        </div>
        <div className="right-section">
            <Featured />
        </div>
    </div>
  )
}

export default Courses