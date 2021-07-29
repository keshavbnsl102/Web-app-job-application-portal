import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/login'
import Registerappli from './components/Common/Registerappli'
//import Registerrecruiter from '.components/Common/Registerrecruiter'
import Navbar from './components/templates/Navbar'
import Profile from './components/Users/Profile'
//import cat from './components/Users/cats.js'
import recruiter from './components/Common/Registerrecruiter'
import login from './components/Common/login'
import recrudash from './components/Common/recrudash'
import applidash from './components/Common/applidash'
import addjob from './components/Common/addjob'
import applisearch from './components/Common/applisearch'
import recruview from './components/Common/recruview'
import clickkarnepe from './components/Common/clickkarnepe'
import myapplications from './components/Common/myapplications'
function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/users" exact component={UsersList}/>
        <Route path="/registerappli" exact component={Registerappli}/>
        <Route path="/registerrecruiter" exact component={recruiter}/>
        <Route path="/login" exact component={login}/>
        <Route path="/recrudash" exact component={recrudash}/>
        <Route path="/applidash" exact component={applidash}/>
        <Route path="/addjob" exact component={addjob}/>
        <Route path="/applisearch" exact component={applisearch}/>
        <Route path="/recruview" exact component={recruview}/>
        <Route path="/clickkarnepe" exact component={clickkarnepe}/>
        <Route path="/myapplications" exact component={myapplications}/>
      </div>
    </Router>
  );
}

export default App;
