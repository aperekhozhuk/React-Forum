import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: '',
      username: props.username,
      userLoaded: props.userLoaded,
      formSubmitting: false
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

  // Return 0 if all OK. 1 - if bad username, 2 - if password
  checkCreds(username, password) {
    let username_regex = window.USERNAME_REGEX
    let password_regex = window.PASSWORD_REGEX
    if (!(username_regex.test(username))) {
      return 1
    } else if (!(password_regex.test(password))) {
      return 2
    } else {
      return 0;
    }
  }

  submitForm(e) {
    e.preventDefault();
    // If form submitting in processing - wait
    if (this.state.formSubmitting) {
      return
    }
    this.form = e.target
    const password = e.target.password.value
    const username = e.target.username.value
    const ok = (this.checkCreds(username, password))
    if (ok === 1) {
      this.setState({ alert: window.UNCORRECT_NAME_MESSAGE })
      return
    } else if (ok === 2) {
      this.setState({ alert: window.WEAK_PASS_MESSAGE })
      return
    }
    const data = {
      'username': username,
      'password': password
    }

    this.setState({formSubmitting: true})
    axios.post(`${window.API_URL}/register`, data, {
      headers: window.API_HEADERS
    })
    .then( res => this.signup_succes(res) )
    .catch( error => this.signup_failed(error) );
  }

  signup_succes(response) {
    this.form.username.value = ''
    this.form.password.value = ''
    this.setState({formSubmitting: false})
    this.props.history.push("/login")
  }

  signup_failed(error) {
    let message = ''
    if (error.response && error.response.data)
      message = error.response.data['error']
    else
      message = window.SERVER_ERROR_MESSAGE
    this.setState({ alert: message, formSubmitting: false})
  }

  render() {
    return (
      <Fragment>
        { !this.state.username && this.state.userLoaded &&
          <div className="container pt-5">
            <p>Please, sign up for ability to create own posts</p>
            <p>Already have account?
            <Link to="/login" className="text-decoration-none">  Sign in, please</Link>
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
              <button type="submit" className="btn btn-primary">Sign up</button>
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


export default Register
