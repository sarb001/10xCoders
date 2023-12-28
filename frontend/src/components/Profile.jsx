import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { CancelSubscription, LoadUser } from '../Actions/User';
import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  // console.log('user Profile -',user);
  // console.log('user name11 -',user.user.name);
   const dispatch =   useDispatch();
   const navigate =   useNavigate();
  //  const { user , subscriptionId , message  : subscriptiomessage } = useSelector((state) => state.user);
   
  const user = useSelector((state) => state.user?.user);
  console.log(' dispatch main  user --',user);
  const subscriptionId = useSelector((state) => state.user?.user?.subscription?.id);
   console.log('subsc id dispatched  -',subscriptionId);

  useEffect(() => {
    dispatch(LoadUser());
 },[dispatch])

   const handlesubscription = () => {
     navigate('/subscribe');
   }

   const cancelsubscription = async() => {
    console.log('cliedkwwk');
      await dispatch(CancelSubscription(subscriptionId));
   }

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
              {user?.subscription && user?.subscription.status === 'active' ? (   
                 <Button variant='contained' onClick={cancelsubscription}>
                  Cancel Subscription 
               </Button>
                ) : (
                  <Button variant='contained' onClick={handlesubscription}>
                     Subscribe 
                  </Button>
                )}
          </div>
    </div>
  )
}

export default Profile;
