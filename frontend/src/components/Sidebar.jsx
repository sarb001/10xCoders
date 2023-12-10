import React from 'react'

import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <span> MAIN MENU </span>
            <div className="course-list">
                <div className="home link">
                    <span> <HomeIcon /> </span>
                    <Link to={'/'}> Home </Link>
                </div>

                <div className="course link">
                    <span> <SchoolIcon /> </span>
                    <Link to={'/courses'}> Courses </Link>
                </div>

                <div className="pricing link">
                    <span> <PaymentsIcon /> </span>
                    <Link to={'/pricing'}> Pricing </Link>
                </div>
            </div>
    </div>
  )
}

export default Sidebar