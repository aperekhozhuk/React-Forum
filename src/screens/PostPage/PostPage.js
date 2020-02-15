import React, { Component, Fragment } from 'react'
import axios from 'axios'

class PostPage extends Component {
  state = {
    post: {},
    error: false,
    isLoaded: false
  }

  componentDidMount() {
    axios.get(
      `http://localhost:5000/articles/${this.props.match.params.id}`
    ).then(res => this.setState({ post: res.data, isLoaded: true }))
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
              <h5><span className="font-italic">Posted by user with id: </span>{this.state.post.user_id}</h5>
              <hr></hr>
              <h1 className="mb-4 mt-3">{this.state.post.title}</h1>
              <p>{this.state.post.text}</p>
              <hr></hr>
              <p>Posted: {this.state.post.date_posted}</p>
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
