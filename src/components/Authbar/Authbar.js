import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Authbar extends Component {
  render() {
    return (
      <div className="d-flex bg-dark">
        <Link className="p-3 px-5 text-decoration-none nav-link" to="/login">Login</Link>
        <Link className="p-3 px-5 text-decoration-none nav-link" to="/register">Register</Link>
      </div>
    )
  }
}

export default Authbar