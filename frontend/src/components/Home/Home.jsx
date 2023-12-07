import React from 'react'
import './Home.css' ;
import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';

const Home = () => {
  return (
    <div className="home-container">
        <div className="left-section">
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
            </div>
        </div>
        <div className="right-section">
          <span> Featured </span>
        </div>
    </div>
  )
}

export default Home