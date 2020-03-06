import React, { Component, Fragment } from 'react'
import axios from 'axios'


class UserProfile extends Component {
  state = {
    profile: null,
    error: false,
    isLoaded: false
  }

  componentDidMount() {
    axios.get(
      `${window.API_URL}/users/${this.props.match.params.id}`
    ).then(res => this.setState({ profile: res.data, isLoaded: true }))
    .catch( error => {
        if (!error.response) {
          this.setState( {error: true})
        }
        this.setState({isLoaded: true})
      }
    );
  }

  render() {
    return (
      <div className="container mt-5">
        { this.state.error? (
          <p>{window.SERVER_ERROR_MESSAGE}</p>
        ) : (
          this.state.isLoaded? (
            this.state.profile? (
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
              <p>User with id={this.props.match.params.id} not found</p>
            )
          ) : (
            <p>Loading, please wait</p>
          )
        )}
      </div>
    )
  }

}

export default UserProfile
