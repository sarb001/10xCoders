import React from 'react'
import  '../../styles/App.css' ;
import Sidebar from '../Sidebar';
import Featured from '../Featured';
import Freevideos from '../Freevideos';

const Home = () => {
  return (
    <div className="home container">
        <div className="left-section">
            <Sidebar />
        </div>
        <div className="right-section">
           {/* <Featured /> */}
           <button> Create Course </button>  
           <h3> Course Whole Template </h3>
        </div>
    </div>
  )
}

export default Home