import React from 'react';
import './NavBar.css';
import {
  Link,
} from "react-router-dom";

function NavBar() {
  return (
    <nav class="navbar navbar-dark navbar-expand-sm mb-3">
    <Link class="navbar-brand" to="">tronweb</Link>
      <div class="container">
      <ul class="navbar-nav">
        <li><Link class="nav-link" to="/">
          <i class="icon-th"></i>Dashboard</Link>
        </li>
        <li class="nav-item"><Link class="nav-link" to="/jobs">
          <i class="icon-time"></i>Scheduled Jobs</Link>
        </li>
        <li class="nav-item"><Link class="nav-link" to="/configs">
          <i class="icon-wrench"></i>Config</Link>
        </li>
      </ul>

      <form class="form-inline pull-right">
        <input type="text" class="form-control search-query typeahead" placeholder="Search" autocomplete="off" data-provide="typeahead" />
        <div class="icon-search"></div>
      </form>
      </div>
    </nav>
  );

}

export default NavBar;
