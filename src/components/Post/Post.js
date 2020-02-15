import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Post extends Component {
  render() {
    const { id, title, user_id } = this.props.post

    return (
      <div className="border-bottom border-secondary p-4">
        <h4>User #{user_id}</h4>
        <Link to={`/posts/${id}`} className="text-decoration-none">{title}</Link>
      </div>
    )
  }
}

export default Post;
