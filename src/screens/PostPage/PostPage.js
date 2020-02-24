import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


class PostPage extends Component {
  state = {
    post: {},
    error: false,
    isLoaded: false
  }

  componentDidMount() {
    axios.get(
      `${window.API_URL}/articles/${this.props.match.params.id}`
    ).then(res => this.setState({ post: res.data, isLoaded: true }))
    .catch( error =>
      this.setState( {error: true})
    );
  }

  render() {
    return (
      <div className="container mt-5">
        { this.state.error? (
          <p>{window.SERVER_ERROR_MESSAGE}</p>
        ) : (
          this.state.isLoaded? (
            <Fragment>
              <hr></hr>
              <h1 className="mb-4 mt-3 text-success">{this.state.post.title}</h1>
              <p className="text-primary">{this.state.post.text}</p>
              <hr></hr>
              <div>
                <span className="font-italic">Posted by: </span>
                <Link to={`/users/${this.state.post.user_id}`}>
                  <span className="btn text-primary">
                    {this.state.post['author.username']}
                  </span>
                </Link>
                <span> | at {this.state.post.date_posted}</span>
              </div>
            </Fragment>
          ) : (
            <p>Loading, please wait</p>
          )
        )}
      </div>
    )
  }
}

export default PostPage;
