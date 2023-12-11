import React from 'react'
import Sidebar from '../Sidebar';
import  '../../styles/App.css' ;
import Featured from '../Featured';
import Freevideos from '../Freevideos';

const Courses = () => {
  return (
    <div className="container">
        <div className="left-section">
           <Sidebar />
        </div>
        <div className="right-section">
            <Featured />
            <Freevideos />
        </div>
    </div>
  )
}

export default Courses