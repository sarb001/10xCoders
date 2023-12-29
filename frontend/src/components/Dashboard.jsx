import React from 'react'
import Sidebar from './Sidebar'
import DashboardSidebar from './DashboardSidebar'

const Dashboard = () => {
  return (
    <div className="home container">
        <div className="left-section">
                <h2> Dashboard  </h2>      
        </div>
        <div className="right-section" style = {{margin:'5%'}}>
            <DashboardSidebar />
        </div>
  </div>
  )
}

export default Dashboard