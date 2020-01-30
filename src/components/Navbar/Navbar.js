import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="d-flex bg-dark">
          <Link className="p-3 text-decoration-none nav-link" to="/">Main Page</Link>
          <Link className="p-3 text-decoration-none nav-link" to="/posts/new">Create new post</Link>
      </div>
    )
  }
}

export default Navbar;
