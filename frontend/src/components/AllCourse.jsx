import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AllCourses } from '../Actions/course';
import { LoadUser } from '../Actions/User';

const AllCourse = () => {

    const  dispatch = useDispatch();
    
    const { isAuthenticated , user } = useSelector((state) => state.user);

    const allcourses  = useSelector(state => state.allusers?.courses);
    console.log('allcourses front -',allcourses);

     useEffect(() => {
        dispatch(AllCourses())
        dispatch(LoadUser());
     },[dispatch])

     const BuyingCourseHandler = (id) => {
       console.log('buying course-',id);
     }

    //  const user
    

  return (
    <div>
            <div className="home container">
            <div className="left-section">
                <Sidebar />
            </div>
            <div className="right-section">
                <h3> Browsing  All Courses </h3>
                <div className="courselist">
                
                  {allcourses?.map((item) => (
                      <div className = 'course-container' key = {item._id}> 
                          <img src =  {item.courseposter.url}  style = {{width:'100%', height:'220px',
                        objectFit:'cover',display:'block'
                        ,borderRadius:'25px'}} />
                     
                        <span id = "course-detail">
                          <span> Title - {item.title} </span>
                          <span> Price - {item.price} </span>
                          <span> Creator - {item.creator.name} </span>
                          <div style = {{display:'grid',margin:'3%',gridTemplateColumns:'1fr 1fr'}}>
                            <span>
                            {/* <Link to = {`/course/${item._id}`}> */}
                              {user == null ? (
                              <> 
                                 <button className = "view detail"  
                                 > Login First 
                                 </button>
                             
                              </>): (
                              <>  
                                  <button className = "view detail"  
                                     onClick = {()  => BuyingCourseHandler(item._id)}> Buy Now 
                                 </button>
                              </>)}
                                {/* <button className = "view detail"  
                                 onClick = {()  => BuyingCourseHandler(item._id)}> Buy Now 
                                 </button> */}
                                </span>

                            
                          {/* <button onClick={() => deleteHandler(item._id)}> Delete  Course  </button> */}
                          </div>
                        </span>
                      </div>
                  ))}
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllCourse