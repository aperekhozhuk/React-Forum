import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';


class Register extends Component {
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

  // Return 0 if all OK. 1 - if bad username, 2 - if password
  checkCreds(username, password) {
    if (
      username.length < window.MIN_NAME_LEN ||
      username.length > window.MAX_NAME_LEN
    ) {
      return 1
    }
    const allowed_symbols = window.CREDS_ALLOWED_SYMBOLS
    for (let i = 0; i < username.length; i++) {
      let a = username.charAt(i);
      if (!(
        allowed_symbols.low_letters.includes(a) ||
        allowed_symbols.up_letters.includes(a) ||
        allowed_symbols.digits.includes(a) ||
        allowed_symbols.spec_symbols.includes(a)
      )) {
        return 1
      }
    }
    let digit = false
    let up_letter = false
    let low_letter = false
    let spec_symbol = false
    if (
      password.length < window.MIN_PASS_LEN ||
      password.length > window.MAX_PASS_LEN
    ) {
      return 2
    }
    for (let i = 0; i < password.length; i++) {
      let a = password.charAt(i);

      if (allowed_symbols.low_letters.includes(a)) {
        low_letter = true
      } else if (allowed_symbols.up_letters.includes(a)) {
        up_letter = true
      } else if (allowed_symbols.digits.includes(a)) {
        digit = true
      } else if (allowed_symbols.spec_symbols.includes(a)) {
        spec_symbol = true
      } else {
        return 2
      }
    }
    if (!(digit && up_letter && low_letter && spec_symbol)) {
      return 2
    }
    return 0
  }

  submitForm(e) {
    e.preventDefault();
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
    const headers = {
      'Content-Type': 'application/json',
    }

    axios.post(`${window.API_URL}/register`, data, {
      headers: headers
    })
    .then( res => this.signup_succes(res) )
    .catch( error => this.signup_failed(error) );
  }

  signup_succes(response) {
    this.form.username.value = ''
    this.form.password.value = ''
    this.props.history.push("/login")
  }

  signup_failed(error) {
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
