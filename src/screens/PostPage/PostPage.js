import React, { Component } from 'react'
import axios from 'axios'

class PostPage extends Component {
  state = {
    post: {}
  }

  componentDidMount() {
    axios.get(
      `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`
    ).then(res => this.setState({ post: res.data }))
  }

  render() {
    return (
      <div>
        <h3>Posted by user with id: {this.state.post.userId}</h3>
        <hr></hr>
        <h1>{this.state.post.title}</h1>
        <hr></hr>
        <p>{this.state.post.body}</p>
      </div>
    )
  }
}

export default PostPage;
