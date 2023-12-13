import React, { useState } from 'react';
import { Avatar, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [avatar ,setAvatar] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    toast.success(' Working Now ')
  }

  const handleImageChange = () => {

  }

  return (
    <div className="signup-container" style = {{display:'flex',textAlign:'center',
    padding:'5%',justifyContent:'center'}}>
       <form onSubmit={submitHandler}>
         <Typography> Register Now  </Typography> 
           <Avatar   src = {avatar}  />
           <input type = "file"     accept="image/*"  onChange = {handleImageChange}  />
         
         <label> UserName :-  </label>
         <input type = "text"  placeholder='Enter Name'  value={name}   onChange={(e) => setName(e.target.value)} />
        
         <label> Email :-  </label>
         <input type = "text"  placeholder='Enter Email' value={email}  
         onChange={(e) => setEmail(e.target.value)} />
        
         <label> Password :-  </label>
         <input type = "password"  placeholder='Enter Password herre...'  
         value={password}  onChange={(e) => setPassword(e.target.value)}
         />

         <Link to = "/login">
            <Typography> Already Signed Up? Login Now </Typography>
         </Link>

        <Button variant='contained' type = "submit" > Sign Up Now </Button>

       </form> 
    </div>
  )
} 

export default Signup