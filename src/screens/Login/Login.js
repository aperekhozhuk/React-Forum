import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'


class Login extends Component {
  state = {
    alert: ''
  }

  submitForm(e) {
    e.preventDefault();
    this.form = e.target

    const data = {
      'username': e.target.username.value,
      'password': e.target.password.value
    }
    const headers = {
      'Content-Type': 'application/json',
    }

    axios.post('http://localhost:5000/login', data, {
      headers: headers
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
    this.props.setUser(response.data.username)
  }

  login_failed(error) {
    this.setState({ alert: error.response.data.error })
  }
  render() {
    return (
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
    )
  }
}

export default Login