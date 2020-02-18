import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Authbar from '../Authbar/Authbar'

class Navbar extends Component {
  render() {
    return (
      <div className="d-flex bg-dark justify-content-between">
        <div className="d-flex bg-dark">
            <Link className="p-3 text-decoration-none nav-link" to="/">Main Page</Link>
            <Link className="p-3 text-decoration-none nav-link" to="/posts/new">Create new post</Link>
        </div>
        <Authbar username={this.props.username} userLoaded={this.props.userLoaded}/>
      </div>
    )
  }
}

export default Navbar;
