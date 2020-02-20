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
      <div className="nav-bar row d-flex bg-dark justify-content-between">
        <div className="d-flex bg-dark col-12 col-sm-6 justify-content-start">
            <Link className="p-3 text-decoration-none nav-link" to="/">Main Page</Link>
            <Link className="p-3 text-decoration-none nav-link" to="/posts/new">Create new post</Link>
        </div>
        <div className="d-flex bg-dark col-12 col-sm-6 justify-content-end">
          <Authbar
            username={this.state.username}
            userLoaded={this.state.userLoaded}
            unSetUser={this.props.unSetUser}
          />
        </div>
      </div>
    )
  }
}

export default Navbar;
