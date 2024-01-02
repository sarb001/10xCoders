import { Box, Button, Container, Modal, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  { BuySubscription } from '../Actions/User';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


  const  Subscribe = (user) => {

    const [open, setOpen] = useState(false);
    const [key,setKey]    = useState('');
    // const handleOpen  = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const dispatch = useDispatch();

    const { loading ,error , subscriptionId  , message : subscriptiomessage } = useSelector((state) => state.user);
    console.log('subs id -',subscriptionId);

    const subscribeHandler = async() => {
        const { data : { key } } = await axios.get(`/api/v1/razorpaykey`);
        console.log('key is -',key);
        setKey(key);
        dispatch(BuySubscription());
        handleOpen();
    }

    const handleOpen = () => {
         if(subscriptionId){
            var options = {
              "key": "rzp_test_VMC5ub0sPqndLy",
              "subscription_id": subscriptionId,
              "name": "Acme Corp. Frontend",
              "description": "Monthly Test Plan",
              "callback_url": `/api/v1/paymentverification`,
              "prefill": {
                "name": user?.name,
                "email": user?.email,
              },
              "theme": {
                "color": "#FFC800"
              }
             };
           var rzp1 = new Razorpay(options);
           rzp1.open();
      }
    }


  return (
    <>
          <Card  sx={{ maxWidth: 345 ,bgcolor : 'lightgreen' , border: '2px solid #234', }}>
            <CardHeader 
              title="Pro Pack- Rs3999"
              subheader="September 14, 2016" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                  Join Pro Pack and get access to all Content 
              </Typography>
              <Button  onClick = {subscribeHandler} variant='contained'> Buy Now </Button>
              <Typography variant="body2" color="text.secondary">
                  100% REFUND AT CANCELLATION 
              </Typography>
              <Typography children = {'*Terms & Conditions Apply'} 
                      id="modal-modal-title" component="h2">
              </Typography>
            </CardContent>
          </Card>
    </>
  )
}

export default Subscribe