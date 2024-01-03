import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {  LoadUser } from '../Actions/User';
import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
   const dispatch =   useDispatch();
   const navigate =   useNavigate();
   
    const user = useSelector((state) => state.user?.user);
   console.log(' dispatch main  user --',user);

    useEffect(() => {
      dispatch(LoadUser());
  },[dispatch])

  return (
    <div className="pricing container">
          <div className="left-section">
            <Sidebar />
          </div>
          <div className="right-section" style = {{padding:'4%'}}>
              <div style = {{display:'grid',gridTemplateRows:'1fr 1fr 1fr'}}>
                <Avatar   src =  {user?.profilepic?.url}  alt = "profile-pic"  />
                <span> Name is - {user?.name}   </span>
                <span> Email is - {user?.email}  </span>
              </div>
          </div>
    </div>
  )
}

export default Profile;
