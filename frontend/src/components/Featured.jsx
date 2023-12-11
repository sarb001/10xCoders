import React from 'react'
import '../styles/App.css' ;
import { Link } from 'react-router-dom' ;

const Featured = () => {

    const courses = [
        {
             "id" : 1,
            "title": "First Course",
            "price" : "6200",
            "poster" : "/0-100Cohort.jpeg"
        },
        {
            "id" : 2,
            "title": "Second Course",
            "price" : "1200",
            "poster" : "/0-1 Cohort.jpeg"
        },
        {
            "id" : 3,
            "title": "Third Course",
            "price" : "3200",
            "poster" : "/1-100 cohort.jpeg"
        },
        {
            "id" : 4,
            "title": "Fourth Course",
            "price" : "8200",
            "poster" : "/full-stack.jpg"
        }
    ]


  return (
     <div className="featured-section">
             <h2> Featured  </h2>
         <div className = "mainheader">
             <div className="courselist">
                {courses.map((item) => (
                    <div className = 'course-container' key = {item.id}>  

                       <span id = "img-container"  style = {{width:'100%',height:'50%'}}> 
                        <img src =  {item.poster}  style = {{width:'100%',borderRadius:'25px'}} />
                      </span>

                      <span id = "course-detail">
                        <span> {item.title} </span>
                        <span> {item.price} </span>
                        <Link to = {`/course/${item.id}`}>
                          <button className = "view-detail"> View Details </button>
                        </Link>
                      </span>
                    </div>
                ))}
             </div>
         </div>
     </div>
  )
}

export default Featured