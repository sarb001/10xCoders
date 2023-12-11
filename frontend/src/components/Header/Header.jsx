import React from 'react'
import './Header.css' ;
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <>
    <div className="h-container">
          <Link to = "/">
          <div className="img-container" style = {{width:'50%',height:'50%'}}>
              <img src = "/harkirat-face.jpg"  alt= "main-logo" style = {{width:'15%'}} />
          </div>
          </Link>
        <div className="searchbar">
           <span>
           <input  type = "text"  placeholder = 'Type here to Search' />
           </span> 
          {/* <span id = "search"> <SearchIcon /> </span> */}
        </div>
        <div className="buttons">
          <button id = "signup"> SignUp </button>
          <button id = "login"> Login  </button>
        </div>
    </div>
    </>
  )
}

export default Header