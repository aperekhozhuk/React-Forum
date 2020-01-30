import React, { Component, Fragment } from 'react'
import axios from 'axios'

class PostPage extends Component {
  state = {
    post: {},
    error: false
  }

  componentDidMount() {
    axios.get(
      `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`
    ).then(res => this.setState({ post: res.data }))
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
          <Fragment>
            <h5><span className="font-italic">Posted by user with id: </span>{this.state.post.userId}</h5>
            <h1 className="mb-4 mt-3">{this.state.post.title}</h1>
            <p>{this.state.post.body}</p>
          </Fragment>
        )}
      </div>
    )
  }
}

export default PostPage;
