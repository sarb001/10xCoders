import React, { useState } from 'react'
import  '../../styles/App.css' ;
import Sidebar from '../Sidebar';
import Featured from '../Featured';
import Freevideos from '../Freevideos';
import { Avatar, Button, Dialog, Typography } from '@mui/material';

const Home = () => {
  const [open,setopen] = useState(false);
  const [avatar,setAvatar] = useState("");

  const[title,setTitle] = useState("");
  const[Description,setDescription] = useState("");
  const[Price,setPrice] = useState("");

  const handleClickOpen  = () => {setopen(true)}
  const handleClickClose = () => {setopen(false)}

  const handleImageChange = () => {};

  const CourseSubmithandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className="home container">
        <div className="left-section">
            <Sidebar />
        </div>
        <div className="right-section">
           {/* <Featured /> */}
           <button  onClick={handleClickOpen}> Create Course </button>  
           <h3> Course Whole Template </h3>
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
                     value = {Description}
                     onChange={(e) => setDescription(e.target.value)}
                    /> 

                    <label> Price:- </label>
                    <input type = "number"  placeholder='Enter Price' 
                     value = {Price}
                     onChange={(e) => setPrice(e.target.value)}
                    />
                    <span style = {{padding:'5% 1%'}}>
                      <Button type = "submit" variant='contained' >  Create New Course  </Button>
                    </span>
                </form>
            </div>
        </Dialog>
       
    </div>
  )
}

export default Home