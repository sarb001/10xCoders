import React ,{ useEffect, useState } from 'react'
import { useSelector  ,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { AddMyLecture, CourseLectures, DeleteMyLecture } from '../Actions/course.js' ;
import '../styles/App.css';
import { Button, Dialog, Input, Typography } from '@mui/material';
import { LoadUser } from '../Actions/User.js';
import Sidebar from './Sidebar.jsx';
import { toast } from 'react-toastify';

const MainCourse = ({user,isAuthenticated}) => {

    const  { id } = useParams();
    const  dispatch = useDispatch();
    const  courseid = id;
    const  [title,setTitle] = useState('');
    const  [description,setdescription] = useState('');
    const  [video,setVideo] = useState('');
    const  [videoprev,setVideoprev] = useState('');
    const  [open,setopen] = useState(false);

    const handleClickOpen  = () => {setopen(true)}
    const handleClickClose = () => {setopen(false)}

     const  { Lectures  , loading : lectureloading }  = useSelector((state) => state.allusers);
     console.log('All Lectures  -',Lectures);

      useEffect(() => {
        dispatch(CourseLectures(courseid));
        dispatch(LoadUser());
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
      }
      
      const Lecturehandler = async(e,id,title,description,video) => {
            e.preventDefault();
            if(!title || !description || !video){
               return toast.error(' Fill out All Fields ');
            }

            const myForm =  new FormData();
            myForm.append('title',title);
            myForm.append('description',description);
            myForm.append('file',video);

            await dispatch(AddMyLecture(id,myForm));
            setTitle('');
            console.log('title removed',title);
            setdescription('');
            console.log(' desc',description);
            setVideoprev('');
            setVideo('');
            console.log('videoo removed',video);
            dispatch(CourseLectures(courseid));
      }

      const isSubscribed = false;

  return (
    <div>
          <div className="home container">
          
             <div className="left-section">
               <Sidebar />
             </div>

              <div className = "lecture-container" style = {{padding:'5%',
              display:'grid',gridTemplateColumns:'1.6fr 0.4fr'}}>
                 
                      {isSubscribed ? (
                      <>  
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
                                    {/* if subscribed then it unlocked already (  can access )  
                                  //  if Not  Subscribed then it is Locked cannot access lectures  */}

                                  
                                  </div>

                              )
                            ) : (<>  No Lectures Present </>)}
                         </div>
                      </>
                      ) : 
                        <>
                          <div className="section-first">    
                          {Lectures?.length > 0  ? ( 
                            Lectures.map(item =>  
                              <div className = 'lectures-card' key = {item._id}>
                                  <div className="first-side">
                                    <h2>{item.title} </h2> 
                                  </div>
                                  {/* if subscribed then it unlocked already (  can access )  
                                //  if Not  Subscribed then it is Locked cannot access lectures  */}

                                  <div className="second-side">
                                    <button onClick={handleClickOpen} >  Unlocked Content  </button>
                                  </div>
                                </div>

                            )
                          ) : (<>  No Lectures Present </>)}
                          </div>
                        </>}
                        {/* // logged user === params id or course's creator */}
                        {/* {
                          user?._id == id.creator ? 
                          <>
                          <div className="section-second" style = {{textAlign:'center'}}>

                          </div>
                          </>: 
                          <>
                             <h3> Add Lectures Now </h3>
                          //     <form onSubmit = {e => Lecturehandler(e,id,title,description,video)}>
                          //         <span style = {{padding:'4%'}}> Title </span>
                          //         <input type = "text"  placeholder='Enter title ...' 
                          //         value = {title}
                          //         onChange = {(e) => setTitle(e.target.value)}
                          //         />
                          //         <span style = {{padding:'4%'}}> Description </span>
                          //         <input type = "text"  placeholder='Enter Description...' 
                          //         value = {description}
                          //         onChange = {(e) => setdescription(e.target.value)}
                          //         />
                          //         <span style = {{padding:'4%'}}> Select Video </span>
                          //         <input type = "file" accept='video/*' onChange={changevideoHandler} />
          
                          //         {videoprev && (
                          //           <video controls src = {videoprev} 
                          //           controlsList='nodownload'>
                          //           </video>
                          //         ) }
          
                          //         <span style = {{padding:'4%'}}>
                          //           <Button variant = 'contained' 
                          //           type = "submit" 
                          //           disabled = {lectureloading}> Upload  Lecture </Button>
                          //         </span>
                          //     </form> 
                          // </>
                        } */}

                
                          <div> 
                            <h2> Add Lectures Now  </h2>
                            <form  
                            onSubmit = {e => Lecturehandler(e,id,title,description,video)}>
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
                                    <input type = "file" accept='video/*'
                                     onChange={changevideoHandler} />
            
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

                   <Dialog  open = {open}  onClose ={handleClickClose}>
                <div style = {{padding:'8%'}}>
                  {user ? 
                   (<>
                       {/* <Typography> Buy Subscription  </Typography> */}
                       <button> Subscribe Now  </button>
                   </>)
                  : <>
                       <Typography> Create Account First/Login   </Typography>
                  </>}
                  </div>
                  </Dialog>

              </div>
           </div>
    </div>
  )
}

export default MainCourse