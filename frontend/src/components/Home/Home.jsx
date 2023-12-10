import React from 'react'
import  '../../styles/App.css' ;
import Sidebar from '../Sidebar';
import Featured from '../Featured';

const Home = () => {
  return (
    <div className="home container">
        <div className="left-section">
            <Sidebar />
        </div>
        <div className="right-section">
           <Featured />
        </div>
    </div>
  )
}

export default Home