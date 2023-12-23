import { Box, Button, Container, Modal, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  { BuySubscription } from '../Actions/User';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';



  const  Subscribe = (user) => {

    const [open, setOpen] = useState(false);
    const [key,setKey]    = useState('');
    const handleOpen  = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();

    const { loading ,error , subscriptionId } = useSelector((state) => state.user);
    console.log('subs id -',subscriptionId);

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '5px solid #234',
    //     boxShadow: 24,
    //     p: 4,
    //   };    

    const subscribeHandler = async () => {
        // const { data : { key } } = await axios.get(`/api/v1/razorpaykey`);
        // console.log('key is -',key);
        // setKey(key);
        // dispatch(BuySubscription());
    }

    // useEffect(() => {
    //     console.log('inside effect');

    //         var options = {
    //           "key": "rzp_test_VMC5ub0sPqndLy",
    //           "subscription_id": subscriptionId,
    //           "name": "Acme Corp. Frontend",
    //           "description": "Monthly Test Plan",
    //           "handler": function(response) {
    //             alert(response.razorpay_payment_id),
    //             alert(response.razorpay_subscription_id),
    //             alert(response.razorpay_signature);
    //           },
    //           "prefill": {
    //             "name": user?.name,
    //             "email": user?.email,
    //           },
    //           "theme": {
    //             "color": "#F37254"
    //           }
    //         };

    //         var rzp1 = new Razorpay(options);
    //         const mainopen =  document.getElementById('rzp-button1');
			
    //         document.addEventListener('click', function(e) {
    //             rzp1.open();
		//         	e.preventDefault();
    //         })
    // },[dispatch,user.name,user.email,key,subscriptionId])

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
              <Button  variant='contained'> Buy Now </Button>
              <Typography variant="body2" color="text.secondary">
                  100% REFUND AT CANCELLATION 
              </Typography>
              <Typography children = {'*Terms & Conditions Apply'} 
                      id="modal-modal-title" component="h2">
              </Typography>
            </CardContent>
          </Card>

            {/* <Button onClick={handleOpen}> Subscribe Now </Button> 
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx = {style}>
                <Typography children = {'*Terms & Conditions Apply'} 
                id="modal-modal-title" variant="h6" component="h2">
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Pro Pack - ₹299.00
                </Typography>
                <button 
                // variant='contained' 
                onClick={subscribeHandler}
                disabled = {loading}  
                id = "rzp-button1"
                > Buy Now </button>
            </Box>
           </Modal> */}

           {/* <Container h="90vh" p="16">
              <Heading children="Welcome" my="8" textAlign={'center'} />
               <VStack
                boxShadow={'lg'}
                alignItems="stretch"
                borderRadius={'lg'}
                spacing="0"
              >
                <Box bg="yellow.400" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
                  <Text color={'black'} children={`Pro Pack - ₹299.00`} />
                </Box>
                <Box p="4">
                  <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
                    <Text children={`Join pro pack and get access to all content.`} />
                    <Heading size="md" children={'₹299 Only'} />
                  </VStack>

                  <Button
                    my="8"
                    w="full"
                    colorScheme={'yellow'}
                    onClick={subscribeHandler}
                    isLoading={loading}
                  >
                    Buy Now
                  </Button>
                </Box>

                <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
                  <Heading
                    color={'white'}
                    textTransform="uppercase"
                    size="sm"
                    children={'100% refund at cancellation'}
                  />

                  <Text
                    fontSize={'xs'}
                    color="white"
                    children={'*Terms & Conditions Apply'}
                  />
                </Box>
               </VStack>
             </Container> */}
    </>
  )
}

export default Subscribe