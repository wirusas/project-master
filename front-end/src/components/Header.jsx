
import React from 'react';
import logo from '../assets/logo.png'
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/UsersInitials.css'
import { getLoggedInUser } from '../services/AuthService';

export const Header = () =>{

  const loggedInUser = getLoggedInUser();

  const getInitials = (name) => {
    if (name && name.length >= 2) {
      return name.substring(0, 2).toUpperCase(); // Grąžina dvi pirmas raides ir paverčia jas didžiąja
    }
    return '';
  };
  
return(

    <>

<div className="container" padding-top="60">
  <header className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4" style={{borderBottom:"1px solid rgba(70, 43, 146, 0.50)"}}>

  <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"><img src={logo} height="78"/></a>

    <ul className="nav col-md-4 justify-content-start" style={{marginRight:"82px"}}>
      <li className="nav-item"><a href="#" className="nav-link px-2" style={{color:"#5227CC"}}>Home</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2" style={{color:"#5227CC"}}>Members</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2" style={{color:"#5227CC"}}>Contacts</a></li>
      {/* <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li> */}
    </ul>

    <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{borderColor:"#8540F5", boxShadow:"0px 0px 0px 3px rgba(102, 16, 242, 0.15)"}}/>
        <button className="btn btn-outline-success text-white" type="submit" style={{borderColor:"#8540F5", backgroundColor:"#7749F8", boxShadow:"0px 0px 0px 3px rgba(102, 16, 242, 0.15)"}}>Search</button>
        <div className='users-initials'>{getInitials(loggedInUser)}</div>
      </form>
  </header>
</div>
    
    
    </>
)

}
