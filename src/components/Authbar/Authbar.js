import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

class Authbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      userLoaded: props.userLoaded
    };
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
      <Fragment>
        { this.state.username? (
          <Fragment>
            <Link
              className="p-3 text-decoration-none nav-link"
              to="/profile">Hello, {this.state.username}
            </Link>
            <Link
              className="p-3 text-decoration-none nav-link"
              to="/"
              onClick={this.props.unSetUser}>Logout
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            { this.state.userLoaded? (
              <Fragment>
                <Link className="p-3 text-decoration-none nav-link" to="/login">Login</Link>
                <Link className="p-3 text-decoration-none nav-link" to="/register">Register</Link>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
          </Fragment>
        )
      }
      </Fragment>
    )
  }
}

export default Authbar