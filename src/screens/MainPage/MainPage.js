import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import axios from 'axios'

class MainPage extends Component {
  state = {
    posts: [

    ]
  }

  componentDidMount() {
    axios.get(
      'https://jsonplaceholder.typicode.com/posts?_limit=10'
    ).then(res => this.setState({ posts: res.data }))
  }

  render() {
    return (
      <ul>
        {this.state.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    )
  }
}

export default MainPage;
