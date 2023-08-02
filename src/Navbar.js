import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import logo from './RR-logo.png';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    let {isOpen} = this.state;
    this.setState({ isOpen: !isOpen });
  }


  render ()
      {
        const { isOpen } = this.state;
        return(
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
           <Link className="navbar-brand" to="/"><img src={logo} alt="Romano's Rates" /></Link>
            <button className="navbar-toggler" type="button" onClick={this.handleToggle}>
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
  
}

export default Navigation;
