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

    axios.post('http://localhost:5000/register', data, {
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
    this.setState({ alert: error.response.data.error })
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
