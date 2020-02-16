import React, { Component, Fragment } from 'react'
import axios from 'axios'


class UserProfile extends Component {
  state = {
    profile: {},
    error: false,
    isLoaded: false
  }

  componentDidMount() {
    axios.get(
      `http://localhost:5000/users/${this.props.match.params.id}`
    ).then(res => this.setState({ profile: res.data, isLoaded: true }))
    .catch( error =>
      this.setState( {error: true})
    );
  }

  render() {
    return (
      <div className="container mt-5">
        { this.state.error? (
          <p>Not found</p>
        ) : (
          this.state.isLoaded? (
            <Fragment>
              <p>
                <span className="text-success font-weight-bold">
                  Username :
                </span>
                <span> {this.state.profile.username}</span>
              </p>
              <p>
                <span className="text-success font-weight-bold">
                  Date of regisatration :
                </span>
                <span> {this.state.profile.date_registered}</span>
              </p>
            </Fragment>
          ) : (
            <p>Loading, please wait</p>
          )
        )}
      </div>
    )
  }

}

export default UserProfile
