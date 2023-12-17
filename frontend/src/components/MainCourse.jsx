import React ,{ useEffect, useState } from 'react'
import { useSelector  ,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { CourseLectures } from '../Actions/course.js' ;
import '../styles/App.css';
import { Button } from '@mui/material';

const MainCourse = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    console.log('params is --',{ id });       // course id 

    const [title,setTitle] = useState('');
    const [description,setdescription] = useState('');

     const  { Lectures  , loading : lectureloading  }  = useSelector((state) => state.allusers);
     console.log('Lectures -',Lectures);

      useEffect(() => {
        dispatch(CourseLectures(id));
      }, [dispatch])

      const deleteLecture = (lectureid) => {
         console.log('lectureid -',lectureid);
      }

      const Lecturehandler = () => {

      }

  return (
    <div>
        <h1> Lectures Inside Courses </h1>
       <div className = "lecture-container" style = {{padding:'5%',display:'grid',gridTemplateColumns:'1fr 1fr'}}>
           
            <div className="section-first">    
            {Lectures.length > 0  ? ( 
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
                    <div className="second-side">
                      <button id = "delete" onClick={() => deleteLecture(item._id)}> Delete </button>
                    </div>
                </div>
              )
            ) : (<>  No Lectures Present </>)}
           </div>
           <div className="section-second" style = {{textAlign:'center'}}>
                <h3> Add Lectures Now </h3>
                    <form onSubmit = {Lecturehandler}>
                      
                        <span style = {{padding:'4%'}}> Title </span>
                        <input type = "text"  placeholder='Enter title ...' 
                        value = {title}
                        onChange = {(e) => setTitle(e.target.value)}
                        />
                        <span style = {{padding:'4%'}}> Description </span>
                        <input type = "text"  placeholder='Enter Description...' 
                        value = {description}
                        onChange = {(e) => setdescription(e.target.value)}
                        />
                        <span style = {{padding:'4%'}}>
                          <Button variant = 'contained' 
                          disabled = {lectureloading}> Add Lecture </Button>
                        </span>
                    </form>
                     
           </div>
       </div>
           </div>
  )
}

export default MainCourse