import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie'

class Authbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get('access-token'),
      username: null,
      loaded: false
    };

    this.logout = this.logout.bind(this)

    const headers = {
      'Content-Type': 'application/json',
    }
    const data = {'access-token': this.state.token }
    axios.post('http://localhost:5000/verify-token', data, {
      headers: headers,
    })
    .then(res => this.setState({username: res.data.username }))
    .catch( error =>
      this.setState({loaded: true})
    );
  }

  logout(event) {
    this.setState({
      username: null,
      loaded: true
    })
    Cookies.remove('access-token')
  }

  render() {
    return (
      <div className="d-flex bg-dark">
        { this.state.username? (
          <Fragment>
            <Link className="p-3 px-5 text-decoration-none nav-link" to="/profile">Hello, {this.state.username}</Link>
            <Link className="p-3 px-5 text-decoration-none nav-link" to="/logout" onClick={this.logout}>Logout</Link>
          </Fragment>
        ) : (
          <Fragment>
            { this.state.loaded? (
              <Fragment>
                <Link className="p-3 px-5 text-decoration-none nav-link" to="/login">Login</Link>
                <Link className="p-3 px-5 text-decoration-none nav-link" to="/register">Register</Link>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
          </Fragment>
        )
      }
      </div>
    )
  }
}

export default Authbar