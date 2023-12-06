import React from 'react'
import './Header.css' ;
import SearchIcon from '@mui/icons-material/Search';


const Header = () => {
  return (
    <div className="h-container">
        <div className="img-container" style = {{width:'50%',height:'50%'}}>
          <img src = "/public/harkirat-face.jpg"  alt= "main-logo" style = {{width:'15%'}} />
        </div>
        <div className="searchbar">
           <span>
           <input  type = "text"  placeholder = 'Type here to Search' />
           </span> 
          <span id = "search"> <SearchIcon /> </span>
        </div>
        <div className="buttons">
          <button> SignUp </button>
          <button> Login  </button>
        </div>
    </div>
  )
}

export default Header