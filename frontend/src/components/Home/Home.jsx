import React, { useState , useEffect } from 'react'
import  '../../styles/App.css' ;
import Sidebar from '../Sidebar';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateCourse } from '../../Actions/course';
import { LoadUser } from '../../Actions/User';

const Home = () => {
  
    const [open,setopen] = useState(false);
    const [avatar,setAvatar] = useState("");
    const [imagePrev,setImagePrev] = useState("");
    const [title,setTitle] = useState("");
    const [description,setdescription] = useState("");
    const [price,setprice] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector(state => state.user);

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

    useEffect(() => {
      dispatch(LoadUser());
   },[dispatch])

  return (
    <div className="home container"> 
        <div className="left-section">
            <Sidebar />
        </div>
       
        <div className="right-section" style = {{margin:'5%'}}>

            <div className="text-container" style = {{padding:'2% 20%'}}>
              <span id = "text" style = {{fontSize:'50px'}}> Launch Your  Website, Create  Courses and Monetize 
               as a  Coder </span>
            </div>

            <div style = {{margin:'4% 1%'}}> 
             <span style = {{fontSize:'30px'}}> Earn by spreading your knowledge  </span> 
             </div>

             <Button onClick={handleClickOpen} variant='contained'> 
                Create Course  
             </Button> 
             
              <div className="feature-section" style = {{margin:'6%'}}>
                <div style = {{display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
                    <span> No Usage Fee </span>
                    <span>  Analytics </span>
                    <span> Built in India  </span>
                </div>
              </div>

              <div className="how-works" style = {{margin:'5% 2%'}}>
                <h2> How it Works  </h2>
                <div style = {{display:'grid',gridTemplateColumns:'1fr 1fr',justifyContent:'space-between'}}>
                  <div className='launch course'>
                    <span> <img src = "/public/create-page.png"  alt= "launch-course" />
                    </span>
                    <span style = {{margin:'3% 1%'}}>
                        <span> Launch your Course  </span>
                    </span>
                  </div>

                  <div className='promote course'>
                    <span>
                      <img src = "/use-everywhere.png"  alt= "promote-course" />
                    </span>
                    <span style = {{margin:'3% 1%'}}>
                        <span> Promote it  Everywhere    </span>
                    </span>
                  </div>
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

       </div>
    </div>
  )
}

export default Home