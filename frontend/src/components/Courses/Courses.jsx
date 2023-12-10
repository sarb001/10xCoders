import React from 'react'
import Sidebar from '../Sidebar';
import  '../../styles/App.css' ;
import Featured from '../Featured';

const Courses = () => {
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