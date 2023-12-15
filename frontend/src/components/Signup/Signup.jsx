import React, { useState } from 'react';
import { Avatar, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../Actions/User';

const Signup = () => {

   const { loading } = useSelector((state) => state.user);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [avatar ,setAvatar] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const submitHandler = async(e) => {
    e.preventDefault();
    if(name == '' || email == '' || password == ''){
       return toast.error(' Provide all Fields ');
    }
    await dispatch(userRegister(name,email,password,avatar));
    // navigate('/login');
  }

  const handleImageChange = (e) => {
      const  file =  e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);

        Reader.onload = () => {
            if(Reader.readyState === 2){
              setAvatar(Reader.result);
            }
        }
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

        <Button variant='contained'   
          disabled = {loading}
        type = "submit" > Sign Up Now </Button>
       </form> 
    </div>
  )
} 

export default Signup