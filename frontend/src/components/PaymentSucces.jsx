import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom' ;

  const PaymentSucces = () => {
    // const reference = useSearchParams()[0].get('reference');
        console.log('payment succeded');
    return (
            <>
                <Card  sx={{ maxWidth: 345 ,bgcolor : 'lightgreen' ,
                 border: '2px solid #234', }}>
                <CardHeader
                title= "You have Pro Pack"  />
                <CardContent >
                     Hello Card Content 
                </CardContent>
                </Card>
        
        </>
    );
  };
  
  export default PaymentSucces;
  