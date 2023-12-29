
import { Stack , Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const DashboardSidebar = () => {

  return (
    <div>
        <Box sx = {{width:'100%'}}>
            <Stack spacing={2}>
                <span> <Link to = "/createcourse">  Create Course </Link></span>
                <span> <Link to = "/mycourses">   My Courses  </Link> </span>    
            </Stack>
        </Box>
    </div>
  )
}

export default DashboardSidebar