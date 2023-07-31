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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Brand Name</Link>
        <Link to="/">Exchange Rate</Link>
        <Link to="/chart/:id">Value Chart</Link>
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

