import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Post extends Component {
  render() {
    const post = this.props.post

    return (
      <div className="border-bottom border-secondary p-4">
        <Link to={`/posts/${post.id}`} className="text-decoration-none">
          <h4><span className="text-success">Title:</span>  {post.title}</h4>
        </Link>
        <span className="text-success">Author:</span>
        <Link to={`/users/${post.user_id}`}>
          <span className="btn text-primary">
            {post['author.username']}
          </span>
        </Link>
      </div>
    )
  }
}

export default Post;
