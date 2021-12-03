import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const NavBar = ({isLogged}) => {

  const Litracing=()=>{
    if(isLogged){
      
       return <li className="nav-item m-2">
              <Link to={`/tracing`}>Tracing </Link>
        </li>
      
    } else{
     return <li className="nav-item m-2" >loggati</li>
    }

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">TRACING</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item m-2">
              <Link to={`/login`}>Login</Link>
            </li>
            <Litracing/>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
