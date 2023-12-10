import React from 'react'
import  '../../styles/App.css' ;
import Sidebar from '../Sidebar';

const Home = () => {
  return (
    <div className="home container">
        <div className="left-section">
            <Sidebar />
        </div>
        <div className="right-section">
          <span> Featured </span>
        </div>
    </div>
  )
}

export default Home