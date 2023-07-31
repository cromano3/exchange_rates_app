import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import Chart from './Chart';

import logo from './logo.svg';

import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}


const App = () => {
  return (
    <Router basename="/movie_2">
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="container">
            <div className="navbar-nav">
              <Link className="navbar-brand" to="/">Brand Name</Link>
              <Link className="nav-item nav-link" to="/">Exchange Rate</Link>
              <Link className="nav-item nav-link" to="/chart/:id">Value Chart</Link>
            </div>
          </div>
        </div>
      </nav> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">Container</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div className="dropdown-menu" aria-labelledby="dropdown07">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chart/:id" component={Chart} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

