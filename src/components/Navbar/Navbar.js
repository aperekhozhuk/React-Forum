import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Authbar from '../Authbar/Authbar'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      userLoaded: props.userLoaded
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        username: this.props.username,
        userLoaded: this.props.userLoaded
      })
    }
  }

  render() {
    return (
      <div className="d-flex bg-dark justify-content-between">
        <div className="d-flex bg-dark">
            <Link className="p-3 text-decoration-none nav-link" to="/">Main Page</Link>
            <Link className="p-3 text-decoration-none nav-link" to="/posts/new">Create new post</Link>
        </div>
        <Authbar username={this.state.username} userLoaded={this.state.userLoaded}/>
      </div>
    )
  }
}

export default Navbar;
