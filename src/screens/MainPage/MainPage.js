import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import axios from 'axios'

class MainPage extends Component {
  state = {
    posts: [

    ],
    isLoaded: false
  }

  componentDidMount() {
    axios.get(
      'http://localhost:5000/articles'
    ).then(res => this.setState({ posts: res.data, isLoaded: true }))
  }

  render() {
    return (
      <div className="container my-5 pb-5">
        { this.state.isLoaded? (
            this.state.posts.map((post) => (
              <Post key={post.id} post={post} />
            ))
        ) : (
          <p>Loading, please wait ...</p>
        )}
      </div>
    )
  }
}

export default MainPage;
