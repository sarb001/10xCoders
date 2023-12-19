import React, { useState , useEffect } from 'react'
import  '../../styles/App.css' ;
import Sidebar from '../Sidebar';
import Featured from '../Featured';
import Freevideos from '../Freevideos';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateCourse } from '../../Actions/course';
import { LoadUser } from '../../Actions/User';

const Home = () => {
    const [open,setopen] = useState(false);
    const [avatar,setAvatar] = useState("");

    const[title,setTitle] = useState("");
    const[description,setdescription] = useState("");
    const[price,setprice] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleClickOpen  = () => {setopen(true)}
  const handleClickClose = () => {setopen(false)}

    const handleImageChange = (e) => {
      const  file =  e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
          Reader.onload = () => {
              if(Reader.readyState === 2){
                setAvatar(Reader.result);
              }
          }
    };

    const CourseSubmithandler = async(e) => {
      e.preventDefault();
      await dispatch(CreateCourse(title,description,price,avatar));
      setAvatar('');
      setTitle('');
      setdescription('');
      setprice('');
      navigate('/');
    }

    useEffect(() => {
      dispatch(LoadUser());
   },[dispatch])


  return (
    <div className="home container"> 
        <div className="left-section">
            <Sidebar />
        </div>
        <div className="right-section">
           {/* <Featured /> */}
           {/* <button  onClick = {handleClickOpen}> Create Course </button>  
           <h3> Course Whole Template </h3> */}

            <h2> Launch Your  Website, 
             Create  Courses and Monetize 
             as a  Coder   
             </h2>
             <h3> Earn by spreading your knowledge  </h3>
             <Button onClick={handleClickOpen} variant='contained'> Create Course  </Button> 
             <div className="feature-section">
                <span> No Usage Fee </span>
                <span>  Analytics </span>
                <span> Built in India  </span>
             </div>

               <div className="how-works">
                <h2> How it Works  </h2>
                 <div className='launch-course'>
                  <span>
                     <img src = "/public/create-page.png"  alt= "launch-course" />
                  </span>
                      <h3> Launch your Course  </h3>
                 </div>

                 <div className='launch-course'>
                  <span>
                     <img src = "/use-everywhere.png"  alt= "promote-course" />
                  </span>
                      <h3> Promote it  Everywhere </h3>
                 </div>
               </div>

               <div className='feedback'>
                  <div className='card'>
                     <span id = "card-text">
                       Seamless experience with teachcode.
                       I can teach all students about 
                       opensource easily.
                     </span>

                     <span style = {{display:'grid',gridTemplateColumns:'0.5fr 1.5fr'}}>
                       <img src = "/harkirat-face.jpg"  alt = "person-image" 
                       style = {{width:'60%',borderRadius:'50%'}}
                       />
                       <div id  = "card-detail">
                          <span> Harkirat Singh </span>
                          <span> Youtuber, 100k+ subs </span>
                       </div>
                     </span>
                  </div>

                   <div className="card">

                    <span id = "card-text"> Must try for all tech 
                        who want to share their knowledge.
                        Simply amazing.
                     </span>

                     <span style = {{display:'grid',gridTemplateColumns:'0.5fr 1.5fr'}}>
                       <img src = "/harkirat-face.jpg"  alt = "person-image" 
                       style = {{width:'60%',borderRadius:'50%'}}
                       />
                       <div id  = "card-detail">
                          <span> Anushka Sharma </span>
                          <span> Founder at wingify  </span>
                       </div>
                     </span>
                    
                  </div>

                  <div className="card">
                    <span id = "card-text"> I always wanted a simple-to-use platform 
                      to share my knowledge.
                      Glad that teachcode has finally made it.
                     </span>

                     <span style = {{display:'grid',gridTemplateColumns:'0.5fr 1.5fr'}}>
                       <img src = "/harkirat-face.jpg"  alt = "person-image" 
                       style = {{width:'60%',borderRadius:'50%'}}
                       />
                       <div id  = "card-detail">
                        <span> Anuj Gupta  </span>
                        <span> YC Founder </span>
                       </div>
                     </span>
                  </div>
               </div>
        
          <Dialog  open = {open}  onClose ={handleClickClose}>
            <div style = {{padding:'8%'}}>
              <Typography> Create Course </Typography>
                  <form onSubmit={CourseSubmithandler}>
                    <Avatar   src = {avatar}  />
                    <input type = "file"     accept="image/*"  onChange = {handleImageChange}  />
                  
                      <label> Title </label>
                      <input type = "text"  placeholder='Enter Title Name' 
                      value = {title}
                      onChange={(e) => setTitle(e.target.value)}
                      />

                      <label> Description </label>
                      <input type = "text"  placeholder='Write Description'
                      value = {description}
                      onChange={(e) => setdescription(e.target.value)}
                      /> 

                      <label> Price:- </label>
                      <input type = "number"  placeholder='Enter Price' 
                      value = {price}
                      onChange={(e) => setprice(e.target.value)}
                      />
                      <span style = {{padding:'5% 1%'}}>
                        <Button type = "submit" variant='contained' >  Create New Course  </Button>
                      </span>
                  </form>
              </div>
          </Dialog>
      </div>
    </div>
  )
}

export default Home