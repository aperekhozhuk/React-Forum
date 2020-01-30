import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div style={{border: '5px solid red', marginBottom: '20px'}}>
          <Link style={{padding: '20px'}} to="/">Main Page</Link>
          <Link to="/posts/new">Create new post</Link>
      </div>
    )
  }
}

export default Navbar;
