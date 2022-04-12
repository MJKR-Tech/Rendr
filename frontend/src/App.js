import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import RENDRAPP from "./components/pages/RENDRAPP";
import AboutUs from './components/pages/AboutUs';
import Home from './components/pages/Home';
import LandingPage from './components/pages/LandingPage'
import FormSubmitted from './components/pages/FormSubmitted';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/Home' component={Home}/>
          <Route path='/' exact component = {LandingPage} />
          <Route path='/app' exact component = {RENDRAPP} />
          <Route path='/aboutus' component={AboutUs}/>
          <Route path='/form-submitted' component={FormSubmitted} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
