import React, { useEffect, useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import { Avatar , Button, Dialog, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadUser } from '../Actions/User';
import { CreateCourse } from '../Actions/course';

const CreateCourses = ({user,isAuthenticated}) => {
    
    const [open,setopen] = useState(false);
    const [avatar,setAvatar] = useState("");
    const [imagePrev,setImagePrev] = useState("");
    const [title,setTitle] = useState("");
    const [description,setdescription] = useState("");
    const [price,setprice] = useState("");
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
                setImagePrev(Reader.result);
                setAvatar(file)
              }
          }
    };

    const CourseSubmithandler = async(e) => {
            e.preventDefault();
            const myForm =  new FormData();
            myForm.append('title',title);
            myForm.append('description',description);
            myForm.append('price',price);
            myForm.append('file',avatar);

            await dispatch(CreateCourse(myForm));
            setAvatar('');
            setTitle('');
            setdescription('');
            setprice('');
            navigate('/');
    }

    useEffect (() => {
      dispatch(LoadUser());
   },[dispatch])


  return (
    <>
       <div className="home container">
            <div className="left-section">
                    <h2> Create Courses  </h2>  
                    <Button onClick={handleClickOpen} variant='contained'> 
                        Create Course  
                    </Button>     
            </div>
            <div className="right-section" style = {{margin:'5%'}}>
                  <DashboardSidebar />
            </div>
        </div>

        {isAuthenticated ? (
              <>
                  <Dialog  open = {open}  onClose ={handleClickClose}>
                <div style = {{padding:'8%'}}>
                  <Typography> Create Course </Typography>
                      <form onSubmit={CourseSubmithandler}>
                         {imagePrev && (
                             <Avatar   src = {imagePrev}  /> 
                           )}
                           <input type = "file"  accept="image/*" 
                           onChange = {handleImageChange}  />
                      
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
                            <Button type = "submit" variant='contained' > 
                             Create New Course 
                              </Button>
                          </span>
                      </form>
                  </div>
                  </Dialog>
              </>
            ) : (
            <>
                    <Dialog  open = {open}  onClose ={handleClickClose}>
              <div style = {{padding:'8%'}}>
                <Typography> SignUp Form Here </Typography>
                </div>
                    </Dialog>
            </>)}


    </>
  )
}

export default CreateCourses