import React, { Component } from 'react'

class PostPage extends Component {
  render() {
    return (
      <div>
        Post {this.props.match.params.id}
      </div>
    )
  }
}

export default PostPage;
