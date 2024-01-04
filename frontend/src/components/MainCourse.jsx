import React ,{ useEffect, useState } from 'react'
import { useSelector  ,useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { AddMyLecture, CourseLectures, DeleteMyLecture } from '../Actions/course.js' ;
import '../styles/App.css';
import { Button, Dialog, Input, Typography } from '@mui/material';
import {  LoadUser } from '../Actions/User.js';
import Loader from './Loader.jsx';

const MainCourse = () => {

    const  { id } = useParams();
    const  courseid = id;
    const  dispatch = useDispatch();
    const navigate = useNavigate();

     const  { courses , Lectures  , loading }  = useSelector((state) => state.allusers);
     
      useEffect(() => {
        dispatch(CourseLectures(courseid));
        dispatch(LoadUser());
      }, [dispatch])

      if(loading){
        return  <h1> <Loader /> </h1>
      }

      console.log('Main COurse  - ',courses);

  return (
    <div>
          <div className="home secondcontainer">
          
             <div className="left-section">
                <div className = "lecture-container" style = {{padding:'5%',
                  display:'grid',gridTemplateColumns:'1.6fr 0.4fr'}}>
                        
                          <div className="section-first">    
                              {Lectures?.length > 0  ? ( 
                                Lectures.map(item =>  
                                  <div className = 'lectures-card' key = {item._id}>
                                      <div className="first-side">
                                        <h2>{item.title} </h2> 
                                        <h2>{item.description} </h2> 
                                          <video width="400" height="300" controls>
                                              <source src = {item.video.url} type="video/mp4">
                                              </source>
                                          </video>
                                      </div>
                                    </div>
                                )
                              ) : (<>  No Lectures Present </>)}
                          </div>
                      
                 </div>
             </div>
             </div>
    </div>
  )
}

export default MainCourse