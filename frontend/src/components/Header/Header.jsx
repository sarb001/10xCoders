import React, { useState } from 'react'
import './Header.css' ;
import { Link } from 'react-router-dom';
import { Button, Dialog } from '@mui/material';
import  Signup from '../Signup/Signup';
import  Login from '../Login/Login' ;
import { useDispatch } from 'react-redux';
import { Logout } from '../../Actions/User';

const Header = () => {
    const dispatch = useDispatch();

//   const [open,setopen] = useState(false);
//   const [open1,setopen1] = useState(false);

   // const handleClickOpen1 = () => { setopen1(true) }

   // const handleClickOpen = () => {
   //    setopen(true);
   // };

   // const handleClose = () => {setopen(false)}
   // const handleClose1 = () => {setopen1(false)}

     const isLoggedIn = true;

   const logoutHandler = async(e) => {
      e.preventDefault();
      await dispatch(Logout());
   }

  return (
    <>
    <div className="h-container">
          <Link to = "/">
          <div className="img-container" style = {{width:'50%',height:'50%'}}>
              <img src = "/harkirat-face.jpg"  alt= "main-logo" style = {{width:'15%'}} />
          </div>
          </Link>
        <div className="searchbar">
           <span>
           <input id = "search" type = "text"  placeholder = 'Type here to Search' />
           </span> 
          {/* <span id = "search"> <SearchIcon /> </span> */}
        </div>
        <div className="buttons">
         {!isLoggedIn ? (<>
                   <Link to = "/signup"> SignUp </Link>
                   <Link to = "/login">  Login </Link>
         </>) : 
         (<>
           <Button variant='contained' onClick={logoutHandler}>  Logout  </Button>
         </>)}

          {/* <button id = "signup" onClick = {handleClickOpen}> SignUp </button> */}
          {/* <button id = "login" onClick={handleClickOpen1}> Login  </button> */}
        </div>
{/* 
         <Dialog open = {open} onClose={handleClose}>
            <Signup  />
         </Dialog>
         <Dialog open = {open1} onClose={handleClose1}>
            <Login  />
         </Dialog> */}
    </div>
    </>
  )
}

export default Header