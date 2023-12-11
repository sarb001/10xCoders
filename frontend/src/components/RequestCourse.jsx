import React from 'react'
import Sidebar from './Sidebar'

const RequestCourse = () => {
  return (
    <div className="home container">
    <div className="left-section">
        <Sidebar />
    </div>
    <div className="right-section">
        <button> Request Course </button>  
    </div>
</div>
  )
}

export default RequestCourse