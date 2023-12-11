import React from 'react'
import Sidebar from './Sidebar'

const MyCourses = () => {
  return (
        <div className="home container">
            <div className="left-section">
                <Sidebar />
            </div>
            <div className="right-section">
                <button> My Course </button>  
            </div>
        </div>
  )
}

export default MyCourses