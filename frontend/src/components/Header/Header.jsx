import React, { useEffect, useState } from 'react'
import './Header.css' ;
import { Link } from 'react-router-dom';
import { Button, Dialog } from '@mui/material';
import  Signup from '../Signup/Signup';
import  Login from '../Login/Login' ;
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser, Logout } from '../../Actions/User';

const Header = () => {
    const dispatch = useDispatch();

     const { isAuthenticated , user } = useSelector((state) => state.user);
     console.log('user existed -',isAuthenticated);

   const logoutHandler = async(e) => {
      e.preventDefault();
      await dispatch(Logout());
   }
    
   useEffect(() => {
      dispatch(LoadUser());
   },[dispatch])

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
        </div>

        <div className="buttons">
          {user  == null ? (<>
            <Link to = "/signup"> SignUp </Link>
            <Link to = "/login">  Login </Link>
          </>) : 
          (<>
            <Button variant='contained' onClick={logoutHandler}>  Logout  </Button>
          </>)}
        </div>

    </div>
    </>
  )
}

export default Header