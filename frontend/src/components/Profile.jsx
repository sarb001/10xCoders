import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from '../Actions/User';
import { Avatar } from '@mui/material';


const Profile = () => {

   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.user);
   console.log('user Profile -',user);

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
                <Avatar   src =  {user?.profilepic?.url}  alt = "profile-pic" 
                />
                <span> Name - {user?.name}   </span>
                <span> Email- {user?.email}  </span>
              </div>
          </div>
    </div>
  )
}

export default Profile;
