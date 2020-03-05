import React, { Component, Fragment } from 'react';
import Post from '../../components/Post/Post';
import axios from 'axios'
import './MainPage.css'
import { Link } from 'react-router-dom';


class MainPage extends Component {
  constructor(props) {
    super(props)
    this.changePage = this.changePage.bind(this)
    this.fetchPosts = this.fetchPosts.bind(this)
    let page = 1
    if (props.match) {
      page = parseInt(props.match.params.page)
    }
    this.state = {
      posts: [

      ],
      page : page,
      isLoaded: false,
      next: false,
      error: false
    }
    this.fetchPosts()
  }

  fetchPosts() {
    axios.get(
      `${window.API_URL}/articles?page=${this.state.page}`
    ).then(res => this.setState({
      posts: res.data.articles,
      isLoaded: true,
      next: res.data.next,
      error: false
    }))
    .catch( error => this.setState({ error: true, isLoaded: true }));
  }

  changePage(p) {
    this.setState({ page: this.state.page + p, isLoaded: false})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchPosts()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newPage = 1
    if (nextProps.match) {
      newPage = parseInt(nextProps.match.params.page)
    }
    if (prevState.page !== newPage) {
      return {page: newPage}
    }
    return null
  }

  render() {
    return (
      <div className="container">
        <div className="sticky-top nav-buttons container px-0 bg-primary">
          { (this.state.page > 1) &&
            <Link
              to={`/posts/page/${this.state.page - 1}`}
              className="btn btn-primary mr-2"
              onClick={() => this.changePage(-1)}
            >Previous Page</Link>
          }
          { this.state.next &&
            <Link
              to={`/posts/page/${this.state.page + 1}`}
              className="btn btn-primary"
              onClick={() => this.changePage(1)}
            >Next Page</Link>
          }
        </div>
        <div className="pt-5">
          { this.state.isLoaded? (
            <Fragment>
              { !this.state.error? (
                <div>
                  { this.state.posts.length? (
                    <Fragment>
                      {/* Displaying posts  */}
                      { this.state.posts.map((post) => (
                        <Post key={post.id} post={post} />
                      ))}
                    </Fragment>
                  ) : (
                    <p>No posts found</p>
                  )}
                </div>
              ) : (
                <p>{window.SERVER_ERROR_MESSAGE}</p>
              )}
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
