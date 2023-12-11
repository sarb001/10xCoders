import React from 'react'
import Sidebar from './Sidebar'

const MyCourses = () => {
  return (
        <div className="home container">
            <div className="left-section">
                <Sidebar />
            </div>
            <div className="right-section">
                    <h3> My  All Courses </h3>
            </div>
        </div>
  )
}

export default MyCourses