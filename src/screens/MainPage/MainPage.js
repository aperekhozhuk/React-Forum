import React, { Component, Fragment } from 'react';
import Post from '../../components/Post/Post';
import axios from 'axios'
import './MainPage.css'


class MainPage extends Component {
  constructor(props) {
    super(props)
    this.changePage = this.changePage.bind(this)
    this.fetchPosts = this.fetchPosts.bind(this)
    this.state = {
      posts: [

      ],
      page : 1,
      isLoaded: false,
      next: false
    }
    this.fetchPosts()
  }

  fetchPosts() {
    axios.get(
      `http://localhost:5000/articles?page=${this.state.page}`
    ).then(res => this.setState({
      posts: res.data.articles,
      isLoaded: true,
      next: res.data.next
    }))
  }

  changePage(p) {
    this.setState({ page: this.state.page + p, isLoaded: false})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchPosts()
    }
  }

  render() {
    return (
      <div className="container">
        <div className="nav-buttons container px-0 position-fixed bg-primary">
          { (this.state.page > 1) &&
            <button
              className="btn btn-primary mr-2"
              onClick={() => this.changePage(-1)}>Previous Page
            </button>
          }
          { this.state.next? (
            <button
              className="btn btn-primary"
              onClick={() => this.changePage(1)}>Next Page
            </button>
          ) : (<Fragment></Fragment>)}
        </div>
        <div>
          { this.state.isLoaded? (
            <Fragment>
              {/* Show nab buttons on down of page  */}
              <div className="pt-5">
                {/* Displaying posts  */}
                { this.state.posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            </Fragment>
          ) : (
            <p>Loading, please wait ...</p>
          )}
        </div>
      </div>
    )
  }
}

export default MainPage;
