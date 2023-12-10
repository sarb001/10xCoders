import React from 'react'
import '../styles/App.css' ;

const Featured = () => {

    const courses = [
        {
            "title": "First Course",
            "price" : "6200",
            "poster" : "/public/0-100Cohort.jpeg"
        },
        {
            "title": "Second Course",
            "price" : "6200",
            "poster" : "/public/0-1 Cohort.jpeg"
        },
        {
            "title": "Third Course",
            "price" : "6200",
            "poster" : "/public/1-100 cohort.jpeg"
        },
        {
            "title": "Fourth Course",
            "price" : "6200",
            "poster" : "/public/full-stack.jpg"
        }
    ]


  return (
     <div className="featured-section">
             <h2> Featured  </h2>
         <div className = "mainheader">
             <div className="courselist">
                {courses.map((item) => (
                    <div className = 'course-container'>  
                       <span id = "img-container" style = {{width:'100%',height:'50%'}}> 
                        <img src =  {item.poster}  style = {{width:'100%'}} />
                      </span>
                       <span> {item.title} </span>
                       <span> {item.price} </span>
                    </div>
                ))}
             </div>
         </div>
     </div>
  )
}

export default Featured