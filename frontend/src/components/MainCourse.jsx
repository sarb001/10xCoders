import React ,{ useEffect, useState } from 'react'
import { useSelector  ,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { AddMyLecture, CourseLectures, DeleteMyLecture } from '../Actions/course.js' ;
import '../styles/App.css';
import { Button, Input } from '@mui/material';

const MainCourse = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const courseid = id;
    const  [title,setTitle] = useState('');
    const  [description,setdescription] = useState('');
    const  [video,setVideo] = useState('');
    const  [videoprev,setVideoprev] = useState('');

     const  { Lectures  , loading : lectureloading }  = useSelector((state) => state.allusers);
     console.log('All Lectures  -',Lectures);

      useEffect(() => {
        dispatch(CourseLectures(id));
      }, [dispatch])

      const deleteLecture = async(lectureid) => {
         console.log('lectureid del -',lectureid);
         console.log('courseid del -',courseid);
         await dispatch(DeleteMyLecture(courseid,lectureid));
      }

      const changevideoHandler = (e) => {
        const file = e.target.files[0];
        console.log('file -video',file);
        const reader = new FileReader();
        console.log('file reader- ',reader);
        reader.readAsDataURL(file);
          reader.onloadend = () => {
            if(reader.readyState == 2){
              setVideoprev(reader.result);
              setVideo(file);
            }
          };
        console.log('video uploaded --');
      }

      const Lecturehandler = async(e,id,title,description,video) => {
            e.preventDefault();
            const myForm =  new FormData();

            myForm.append('title',title);
            myForm.append('description',description);
            myForm.append('file',video);

            // console.log('title-',title);
            // console.log('description--',description);
            // console.log('video -',video);

            await dispatch(AddMyLecture(id,myForm));
            setTitle('');
            setdescription('');
            setVideo('');
            setVideoprev('');
      }

  return (
    <div>
        <h1> Lectures Inside Courses </h1>
       <div className = "lecture-container" style = {{padding:'5%',display:'grid',gridTemplateColumns:'1fr 1fr'}}>
           
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
                    <div className="second-side">
                      <button id = "delete"
                       onClick={() => deleteLecture(item._id)}> Delete </button>
                    </div>
                </div>
              )
            ) : (<>  No Lectures Present </>)}
           </div>
           <div className="section-second" style = {{textAlign:'center'}}>
                <h3> Add Lectures Now </h3>
                    <form onSubmit = {e => Lecturehandler(e,id,title,description,video)}>
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
                        <span style = {{padding:'4%'}}> Select Video </span>
                        <input type = "file" accept='video/*' onChange={changevideoHandler} />

                        {videoprev && (
                          <video controls src = {videoprev} 
                          controlsList='nodownload'>
                          </video>
                        ) }

                        <span style = {{padding:'4%'}}>
                          <Button variant = 'contained' 
                          type = "submit" 
                          disabled = {lectureloading}> Upload  Lecture </Button>
                        </span>
                    </form>
                     
           </div>
       </div>
           </div>
  )
}

export default MainCourse