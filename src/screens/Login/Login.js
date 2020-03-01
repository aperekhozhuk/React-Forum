import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link, Redirect } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: '',
      username: props.username,
      userLoaded: props.userLoaded
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({
        username: this.props.username,
        userLoaded: this.props.userLoaded
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.form = e.target

    const data = {
      'username': e.target.username.value,
      'password': e.target.password.value
    }

    axios.post(`${window.API_URL}/login`, data, {
      headers: window.API_HEADERS
    })
    .then(
      res => this.login_success(res)
    )
    .catch( error => this.login_failed(error));
  }

  login_success(response) {
    this.form.username.value = ''
    this.form.password.value = ''
    Cookies.set('access-token', response.data['access-token'])
    this.props.setUser(response.data)
    this.props.history.push("/")
  }

  login_failed(error) {
    let message = ''
    if (error.response && error.response.data)
      message = error.response.data['error']
    else
      message = window.SERVER_ERROR_MESSAGE
    this.setState({ alert: message })
  }

  render() {
    return (
      <Fragment>
        { !this.state.username && this.state.userLoaded &&
          <div className="container pt-5">
            <p>Please, log in your account</p>
            <p>Don't have?
            <Link to="/register" className="text-decoration-none">  Sign up, please</Link>
            </p>
            <form className="container mt-5" onSubmit={this.submitForm.bind(this)}>
              <div className="form-group">
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  required>
                </input>
              </div>
              <div className="form-group">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required>
                </input>
              </div>
              <p>{this.state.alert}</p>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        }
        { this.state.username &&
          <Redirect to="/" />
        }
        { !this.state.username && !this.state.userLoaded &&
          // Need to add spinner
          <div>Loading</div>
        }
      </Fragment>
    )
  }
}

export default Login