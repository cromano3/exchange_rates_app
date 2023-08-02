import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

import logo from './RR-logo.png';

function Footer(){

  return (
    <footer><Link  to="/"><img src={logo} alt="Romano's Rates" /></Link> <span>Romano's Rates brought to you by </span> <a className='romano' href ='https://www.christopherromano.com/'> Christopher Romano</a></footer>
  )
}

export default Footer;
