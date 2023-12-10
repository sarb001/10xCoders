import React from 'react'
import { useParams } from 'react-router-dom'

const MainCourse = () => {

    const params = useParams();
    console.log('params is --',params);
  return (
    <div>
        MainCourse
     Course data is -- 
    </div>
  )
}

export default MainCourse