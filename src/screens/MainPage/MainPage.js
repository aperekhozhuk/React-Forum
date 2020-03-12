import React, { Component, Fragment } from 'react';
import Post from '../../components/Post/Post';
import SimplePost from '../../components/Post/SimplePost';
import axios from 'axios'
import './MainPage.css'
import { Link } from 'react-router-dom';


class MainPage extends Component {
  constructor(props) {
    super(props)
    this.changePage = this.changePage.bind(this)
    this.fetchPosts = this.fetchPosts.bind(this)
    let page = 1
    let user_filtr = ''
    if (props.match) {
      page = parseInt(props.match.params.page)
      let user_id = props.match.params.user_id
      if (user_id) {
        user_filtr = `/users/${user_id}`
      }
    }
    this.state = {
      posts: [

      ],
      page : page,
      user_filtr: user_filtr,
      isLoaded: false,
      next: false,
      error: false,
      alert: null
    }
    this.fetchPosts()
  }

  fetchPosts() {
    axios.get(
      `${window.API_URL}${this.state.user_filtr}/articles?page=${this.state.page}`
    ).then(res => this.setState({
      posts: res.data.articles,
      isLoaded: true,
      next: res.data.next,
      error: false
    }))
    .catch( error => {
      if (error.response.status === 404) {
        this.setState({alert: error.response.data.error, isLoaded: true})
      } else {
        this.setState({error: true, isLoaded: true})
      }
    });
  }

  changePage(p) {
    this.setState({ page: this.state.page + p, isLoaded: false})
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.user_filtr !== this.state.user_filtr
    ) {
      this.fetchPosts()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newPage = 1
    if (nextProps.match) {
      newPage = parseInt(nextProps.match.params.page)
    } else {
      if (prevState.user_filtr) {
        return {user_filtr: ''}
      }
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
          {this.state.user_filtr &&
            <Link
              to={this.state.user_filtr}
              className="btn btn-success m-1"
            >&lArr; Back to profile</Link>
          }
          { (this.state.page > 1) &&
            <Link
              to={`${this.state.user_filtr}/posts/page/${this.state.page - 1}`}
              className="btn btn-primary m-1"
              onClick={() => this.changePage(-1)}
            >Previous Page</Link>
          }
          { this.state.next &&
            <Link
              to={`${this.state.user_filtr}/posts/page/${this.state.page + 1}`}
              className="btn btn-primary m-1"
              onClick={() => this.changePage(1)}
            >Next Page</Link>
          }
        </div>
        <div className="pt-2">
          { this.state.isLoaded? (
            <Fragment>
              { !this.state.error? (
                <div>
                  { this.state.posts.length? (
                    <Fragment>
                      {/* Displaying posts  */}
                      {!this.state.user_filtr? (
                        this.state.posts.map((post) => (
                          <Post key={post.id} post={post} />
                        ))
                      ) : (
                        this.state.posts.map((post) => (
                          <SimplePost key={post.id} post={post} />
                        ))
                      )}
                    </Fragment>
                  ) : (
                    <p>{this.state.alert || "No posts found"}</p>
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
