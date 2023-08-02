import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navigation from './Navbar';
import Home from './Home';
import Chart from './Chart';
import Footer from './Footer';

import logo from './logo.svg';

import './App.css';


const NotFound = () => {
  return <h2>404 Not Found</h2>;
}


const App = () => {
  return (
    <Router basename="/romanoexchange">
      <Navigation/>
      <div className='main-container'>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/chart" exact component={Chart} />
          <Route path="/chart/:currency" component={Chart} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer/>
      
    </Router>
  );
}

export default App;

