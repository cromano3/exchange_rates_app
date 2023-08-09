import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import logo from './RR-logo.png';

const Navigation = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event) => {
    setIsOpen(!isOpen)
  }

  
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/"><img src={logo} alt="Romano's Rates" /></Link>
      <button className="navbar-toggler" type="button" onClick={handleToggle}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Currency Exchange</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/chart">Currency Rates</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
    
  
}

export default Navigation;
