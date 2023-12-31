import React ,{ useEffect, useState } from 'react'
import { useSelector  ,useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { AddMyLecture, CourseLectures, DeleteMyLecture } from '../Actions/course.js' ;
import '../styles/App.css';
import { Button, Dialog, Input, Typography } from '@mui/material';
import { BuySubscription, LoadUser } from '../Actions/User.js';
import { toast } from 'react-toastify';
import DashboardSidebar from './DashboardSidebar.jsx';
import Loader from './Loader.jsx';

const MainCourse = ({user,isAuthenticated}) => {

    const  { id } = useParams();
    const  courseid = id;
    const  dispatch = useDispatch();
    const  [title,setTitle] = useState('');
    const  [description,setdescription] = useState('');
    const  [video,setVideo] = useState('');
    const  [videoprev,setVideoprev] = useState('');
    const  [open,setopen] = useState(false);
    // const  [openpaymentbox,setopenpaymentbox] = useState(false);

    const handleClickOpen  = () => {setopen(true)}
    const handleClickClose = () => {setopen(false)}
    const navigate = useNavigate();

     const  { courses , Lectures  , loading }  = useSelector((state) => state.allusers);
     
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

      if(loading){
        return  <h1> <Loader /> </h1>
      }

      console.log('Main COurse  - ',courses);

      const maincourseid = courses && courses.length > 0 ? courses[0] : null; 
      const creatorid    = maincourseid ? maincourseid.creator?._id : null; 
      const userid       = user ? user._id : null; 

    //  console.log(' MainCourse _id -' ,maincourseid);
     console.log('Logged userr id - ',creatorid);
     console.log('All Lectures  -'   ,userid);
     console.log(' isAuthhh1  -'     ,isAuthenticated);
     console.log(' user --'          ,user);

      const handlebuycourse = async () => {
          handlePaymentBox();
         dispatch(BuySubscription());
      }

      const handlePaymentBox = () => {
        // navigate('subscribe');
      }


  return (
    <div>
          <div className="home secondcontainer">
          
             <div className="left-section">
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
                                    
                                    <div className="second-side">
                                         <video width="400" height="300" controls>
                                              <source src = {item.video.url} type="video/mp4">
                                              </source>
                                          </video>
                                    </div>
                                     {/* {(user == null ||  creatorid !== userid) ? (
                                      <>  
                                        <button onClick={handleClickOpen} >  Unlocked Content  </button>
                                      </>
                                     ) : (
                                      <>
                                           <video width="400" height="300" controls>
                                              <source src = {item.video.url} type="video/mp4">
                                              </source>
                                          </video>
                                      </>
                                     )} */}
                                </div>
                              )
                            ) : (<>  
                             No Lectures Present 
                            </>)}
                            </div>
                           
                          </>
                          }


                          {user == null ? (
                                <>
                                
                                </>
                          ): (
                            <>
                                  {creatorid === userid ? (
                                     <>
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
                                                    disabled = {loading}> Upload  Lecture </Button>
                                                  </span>
                                          </form> 
                                      </div> 
                                      </>
                                  ) : (
                                    <>
                                        
                                    </>
                                  )}     
                              
                          </>)}
                 </div>
             </div>

             <div className="right-section">
               <Button  variant='contained' onClick = {handlebuycourse}> Buy Now  </Button>
             </div>

                {!user == null && (
                  <>
                  <div className="right-section">
                      <DashboardSidebar />
                  </div>
                  </>
                )}
           </div>

           <Dialog  style = {{margin:'5%'}} open = {open}  onClose ={handleClickClose}>
                        <div style = {{padding:'8%',margin:'5%'}}>
                          {user ? 
                          (<>
                              <button  onClick={handlebuycourse}> Buy Now  </button>
                          </>)
                          : <>
                              <Typography> Create Account First/Login   </Typography>
                          </>}
                          </div>
           </Dialog>
    
    </div>
  )
}

export default MainCourse