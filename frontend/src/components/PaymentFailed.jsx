import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const PaymentFailed = () => {
  return (
            <>
                <Link to="/subscribe">
                <Button variant={'ghost'}>Try Again</Button>
                </Link>
            </>
  )
}

export default PaymentFailed