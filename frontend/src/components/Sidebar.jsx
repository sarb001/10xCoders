import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';

const Sidebar = () => {

   const isLoggedIn = true;  

  return (
    <div className="sidebar-container">
      <span> MAIN MENU </span>
      {isLoggedIn ? 
      <>
            <div className="course-list">
                <div className="home link">
                    <span> <HomeIcon /> </span>
                    <Link to={'/'}> Home </Link>
                </div>

                <div className="course link">
                    <span> <SchoolIcon /> </span>
                    <Link to={'/courses'}> Browser All Courses </Link>
                </div>

                <div className="pricing link">
                    <span> <PaymentsIcon /> </span>
                    <Link to={'/mycourses'}> My Courses </Link>
                </div>

                <div className="pricing link">
                    <span> <PaymentsIcon /> </span>
                    <Link to={'/requestcourse'}> Request Course </Link>
                </div>

                <div className="pricing link">
                    <span> <PaymentsIcon /> </span>
                    <Link to={'/pricing'}> Pricing </Link>
                </div>
            </div>
      </> : 
      <>
            <div className="course-list">
                    <div className="home link">
                        <span> <HomeIcon /> </span>
                        <Link to={'/'}> Home </Link>
                    </div>

                    <div className="course link">
                        <span> <SchoolIcon /> </span>
                        <Link to={'/courses'}> Browser All Courses </Link>
                    </div>
            </div>
      </>
      }
    </div>
  )
}

export default Sidebar