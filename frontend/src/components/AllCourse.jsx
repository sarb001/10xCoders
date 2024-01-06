import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AllCourses } from '../Actions/course';
import { LoadUser } from '../Actions/User';
import Loader from './Loader';

const AllCourse = () => {

  const { isAuthenticated , user , loading } = useSelector((state) => state.user);
  console.log('user in all course -',user);
  console.log('Auth in all course -',isAuthenticated);

   const  dispatch = useDispatch();    

    const allcourses  = useSelector(state => state.allusers?.courses);
    console.log('allcourses front 11 -',allcourses);

     useEffect(() => {
        dispatch(AllCourses())
        dispatch(LoadUser());
     },[dispatch])

     const BuyingCourseHandler = (id,price) => {
       console.log('buying course- 1',id);
       console.log('buying price  1-',price);
     }


  return (
    <div>
            <div className="home container">

              <div className="left-section">
                  <Sidebar />
              </div>

              <div className="right-section">
                  <h3> Browsing  All Courses </h3>
                  <div className="courselist">
                    {  loading && <p>  <Loader /> </p> }
                    {allcourses && allcourses?.map((item) => (
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
                                {!isAuthenticated ? (
                                <> 
                                  <button className = "view detail"  
                                  > Login First 
                                  </button>
                              
                                </>): ""
                                }
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