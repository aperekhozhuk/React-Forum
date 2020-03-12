import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class SimplePost extends Component {
  render() {
    const post = this.props.post
    return (
      <div className="border-bottom border-secondary p-4">
        <Link to={`/posts/${post.id}`} className="text-decoration-none">
          <h4>{post.title}</h4>
        </Link>
      </div>
    )
  }
}

export default SimplePost
