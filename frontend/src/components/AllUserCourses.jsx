import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllUsersCourses } from '../Actions/course';
import { LoadUser } from '../Actions/User';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import '../styles/App.css' ;

const AllUserCourses = () => {

   const allusercourse  = useSelector(state => state.allusers?.courses);

   console.log(' course for except user -',allusercourse);
   const  dispatch = useDispatch();

    useEffect(()=> {
      dispatch(AllUsersCourses());
      dispatch(LoadUser());
    },[dispatch])

    const BuyingCourseHandler = (id,price) => {
      console.log('id is --',id);
      console.log('pricee is --',price);
    }

  return (
  <div className="home container">
        <div className="left-section">
            <Sidebar />
        </div>

        <div className="right-section" style = {{margin:'1%'}}>
          <h2> All  User Cases  </h2>
            
                 <div className="courselist">
                   {allusercourse?.map((item) => (
                      <div className = 'course-container' key = {item._id}> 
                          <img src =  {item.courseposter.url}  style = {{width:'100%', height:'220px',
                        objectFit:'cover',display:'block'
                        ,borderRadius:'25px'}} />
                     
                        <span id = "course-detail">
                          <span> Title - {item.title} </span>
                          <span> Price - {item.price} </span>
                          <span> Creator - {item.creator.name} </span>
                          <span> Lectures - {item.lectures.length} </span>
                          <div style = {{display:'grid',margin:'3%',gridTemplateColumns:'1fr 1fr'}}>
                            <span>
                                 
                                <button onClick = {()  => BuyingCourseHandler(item._id,item.price)}
                                 className = "view detail"> Buy Now </button>
                            </span>
                         
                          {/* <button onClick={() => deleteHandler(item._id)}> Delete  Course  </button> */}
                          </div>
                        </span>

                      </div>
                   ))}
                 </div>
        </div>
  </div>
  )
}

export default AllUserCourses


{/* <span>
  <Link to = {`/course/${item._id}`}>
    <button className = "view detail"> View Details </button>
  </Link>
</span> */}