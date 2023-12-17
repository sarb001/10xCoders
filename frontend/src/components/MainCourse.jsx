import React from 'react'
import { useParams } from 'react-router-dom'

const MainCourse = () => {

    const params = useParams();
    console.log('params is --',params);
  return (
    <div>
        <h1> Course Detail  </h1>
    </div>
  )
}

export default MainCourse