import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';
import { LoadUser } from '../Actions/User';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
    const dispatch = useDispatch();
    
    const { isAuthenticated , user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(LoadUser());
     },[dispatch])
  

  return (
    <div className="sidebar-container">
      <span> MAIN MENU </span>
      {user  == null ? 
         <div className="course-list">
         <div className="home link">
             <span> <HomeIcon /> </span>
             <Link to={'/'}> Home </Link>
         </div>

         <div className="course link">
             <span> <SchoolIcon /> </span>
             <Link to={'/allcourse'}>  All Courses </Link>
         </div>
        </div>
      : 
      <>
         <>
            <div className="course-list">
                <div className="home link">
                    <span> <HomeIcon /> </span>
                    <Link to={'/'}> Home </Link>
                </div>

                <div className="pricing link">
                    <span> <PaymentsIcon /> </span>
                    <Link to={'/usercourses'}> Browse All Courses </Link>
                </div>
                
                <div className="pricing link">
                    <span> <PaymentsIcon /> </span>
                    <Link to={'/requestcourse'}> Request Course </Link>
                </div>

                <div className="pricing link">
                    <span> <PaymentsIcon /> </span>
                    <Link to={'/profile'}> Profile </Link>
                </div>

                <div className="pricing link">
                    <span> <PaymentsIcon /> </span>
                    <Link to={'/createcourse'}> Settings </Link>
                </div>
            </div>
         </>
      </>
      }
    </div>
  )
}

export default Sidebar