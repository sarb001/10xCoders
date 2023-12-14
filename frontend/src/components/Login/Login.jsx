import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { LoginUser } from '../../Actions/User';
import { useDispatch } from 'react-redux';

const Login = () => {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();

   const  submitHandler =  async(e) => {
     e.preventDefault();
     await  dispatch(LoginUser(email,password))
   }

  return (
    <div className="login-container" style = {{padding:'5%',display:'flex',justifyContent:'center'}}>
         <form onSubmit={submitHandler}>
         <Typography > Login Now  </Typography> 
         
         <label> Email :-  </label>
         <input type = "text"  placeholder='Enter Email' 
         value={email}  onChange={(e) => setEmail(e.target.value)} />
        
         <label> Password :-  </label>
         <input type = "password"  placeholder='Enter Password herre...'  
         value={password}  onChange={(e) => setPassword(e.target.value)}
         />

         <Link to = "/signup">
            <Typography> Don't have an Account? Create Now  </Typography>
         </Link>

        <Button variant='contained' type = "submit" > LogIn Now  </Button>
       </form> 
    </div>
  )
}

export default Login