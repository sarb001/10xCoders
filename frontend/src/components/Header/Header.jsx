import React, { useEffect, useState } from 'react'
import './Header.css' ;
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser, Logout } from '../../Actions/User';

const Header = () => {
  
  const  { isAuthenticated } = useSelector(state => state.user);
  console.log('isAuth in Header - ',isAuthenticated);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

   const logoutHandler = async(e) => {
      e.preventDefault();
      await dispatch(Logout());
      navigate('/');
   }
    
   useEffect(() => {
      dispatch(LoadUser());
   },[dispatch])

  return (
    <>
    <div className="h-container">
          <div className="img-container" style = {{width:'50%',height:'50%'}}>
          <Link to = "/">
              <img src = "/harkirat-face.jpg"  alt= "main-logo" style = {{width:'15%',borderRadius:'50%'}} />
          </Link>
          </div>
        <div className="searchbar">
           <span>
           <input id = "search" type = "text"  placeholder = 'Type here to Search' />
           </span> 
        </div>

        <div className="buttons">
          {!isAuthenticated ? (<>
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