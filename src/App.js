import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './App.css';
import Home from './Home';
import Add from './Add';
import Edit from './Edit';
import Details from './Details';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <header className='nav-header'>
          <h1 className='app-title'>recommend.</h1>
          <Link to='/' className='home-link'>home</Link>
          <Link to='/add' className='add-link'>add</Link>
        </header>  
          <Route exact path='/' component={Home} />
          <Route path='/add' component={Add} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/details/:id' component={Details} />
        </div>
      </Router>
    );
  }
}

export default App;
