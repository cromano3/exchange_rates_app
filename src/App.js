import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navigation from './Navbar';
import Home from './Home';
import Chart from './Chart';

import logo from './logo.svg';

import './App.css';


const NotFound = () => {
  return <h2>404 Not Found</h2>;
}


const App = () => {
  return (
    // <Router ">
    <Router basename="/romanoexchange">
      <Navigation>

      </Navigation>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chart" exact component={Chart} />
        <Route path="/chart/:currency" component={Chart} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

