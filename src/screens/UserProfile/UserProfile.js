import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      profile: null,
      error: false,
      isLoaded: false,
    }
  }

  componentDidMount() {
    axios.get(
      `${window.API_URL}/users/${this.state.id}`
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
                <Link
                  to={`/users/${this.state.id}/posts/page/1`}
                  className="text-decoration-none"
                >
                  <h4>Posts of&nbsp;
                    <span className="font-italic font-weight-bold">
                      {this.state.profile.username}
                    </span>
                  </h4>
                </Link>
              </Fragment>
            ) : (
              <p>User with id={this.state.id} not found</p>
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
