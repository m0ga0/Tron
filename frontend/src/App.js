import React from 'react';
import { NavBar } from './components'
import { JobsList } from './components'
import { Job } from './components'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div class="container">
      <NavBar />
      <Switch>
        <Route path="/jobs">
            <JobsList />
        </Route>
        <Route path="/job/:jobId">
            <Job />
        </Route>
        <Route path="/configs">
            <Configs />
        </Route>
        <Route path="/">
            <Home />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Configs() {
  return <h2>Configs</h2>;
}

export default App;
