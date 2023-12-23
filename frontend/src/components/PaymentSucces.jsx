import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom' ;

  const PaymentSuccess = () => {
    // const reference = useSearchParams()[0].get('reference');
        console.log('payment succeded');
    return (
            <>
                <Card  sx={{ maxWidth: 345 ,bgcolor : 'lightgreen' , border: '2px solid #234', }}>
                <CardHeader
                title= "You have Pro Pack"  />
                <CardContent >
                 <Typography variant="body2" color="text.secondary">
                     Payment Success 
                 </Typography>
                   <Typography variant="body2" color="text.secondary">
                          Congratulation you're a pro member. You have access to premium
                          content.
                   </Typography>
                    <Link  to = "/profile">
                        <Button> Go to Profile  </Button>
                    </Link>
                <Typography 
                        id="modal-modal-title" component="h2">
                </Typography>
                </CardContent>
                </Card>
        
        </>
    );
  };
  
  export default PaymentSuccess;
  