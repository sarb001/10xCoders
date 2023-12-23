import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from '../Actions/User';
import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Profile = () => {

   const dispatch = useDispatch();
   const navigate =   useNavigate();
   const { user } = useSelector((state) => state.user);
   console.log('user Profile -',user);

  useEffect(() => {
    dispatch(LoadUser());
 },[dispatch])

   const handlesubscription = () => {
     navigate('/subscribe');
   }

  return (
    <div className="pricing container">
          <div className="left-section">
            <Sidebar />
          </div>
          <div className="right-section" style = {{padding:'4%'}}>
              <div style = {{display:'grid',gridTemplateRows:'1fr 1fr 1fr'}}>
                <Avatar   src =  {user?.profilepic?.url}  alt = "profile-pic" 
                />
                <span> Name - {user?.name}   </span>
                <span> Email- {user?.email}  </span>
              </div>
              <Button variant='outlined' onClick={handlesubscription}>
                 Subscribe 
              </Button>
          </div>
    </div>
  )
}

export default Profile;
