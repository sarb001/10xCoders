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
           <button  onClick = {handleClickOpen}> Create Course </button>  
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
  )
}

export default Home