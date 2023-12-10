import React from 'react'
import Sidebar from '../Sidebar';
import  '../../styles/App.css' ;

const Courses = () => {
  return (
    <div className="container">
        <div className="left-section">
           <Sidebar />
        </div>
        <div className="right-section">
           Courses Available Publicly 
        </div>
    </div>
  )
}

export default Courses