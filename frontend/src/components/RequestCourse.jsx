import React from 'react'
import Sidebar from './Sidebar'

const RequestCourse = () => {
  return (
    <div className="home container">
        <div className="left-section">
            <Sidebar />
        </div>
        <div className="right-section">
            <h2> Request Any Course </h2> 
            <div className='form-container'>
            <form>
                 <label> Course Name </label>
                 <input type = "text"  placeholder='Course Name'  /> 
                 <label> Email </label>
                 <input type = "text"  placeholder='Course Email'  /> 
                 <label> Description </label>
                 <input type = "text"  placeholder='Explain the Course' /> 
                 <span>
                  <button id = "send-btn"> Send Request </button>
                 </span>
            </form>
            </div>
        </div>
</div>
  )
}

export default RequestCourse