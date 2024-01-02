import { Button, Card, CardContent, CardHeader, Typography  } from '@mui/material';
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom' ;

  const PaymentSucces = () => {
        const reference = useSearchParams()[0].get('reference');
        console.log('payment succeded IDDD -',reference);
    return (
            <>
                <Card  sx={{ maxWidth: 345 ,bgcolor : 'lightgreen' ,
                 border: '2px solid #234', }}>
                <CardHeader   title= " Payment has been Completed"  />
                <Typography> You can Access Lectures Now   </Typography>
                <CardContent >
                  <Link to = "/profile">  Go to Profile  </Link>
                     <h3> Reference ID - {reference} </h3>
                </CardContent>
                </Card>
        
        </>
    );
  };
  
  export default PaymentSucces;
  