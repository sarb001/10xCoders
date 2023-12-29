import React from 'react'
import DashboardSidebar from './DashboardSidebar'

const CreateCourse = () => {
  return (
    <>
       <div className="home container">
            <div className="left-section">
                    <h2> Create Courses  </h2>      
            </div>
            <div className="right-section" style = {{margin:'5%'}}>
                <DashboardSidebar />
            </div>
        </div>
    </>
  )
}

export default CreateCourse