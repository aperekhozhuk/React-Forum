import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Post extends Component {
  render() {
    const { id, title, userId } = this.props.post

    return (
      <div>
        <h4>User #{userId}</h4>
        <Link style={{textDecoration: 'none', color: 'green', fontSize: '1.5em'}} to={`/posts/${id}`}>{title}</Link>
        <br></br>
        <hr></hr>
      </div>
    )
  }
}

export default Post;
