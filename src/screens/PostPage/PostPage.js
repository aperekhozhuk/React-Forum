import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './PostPage.css'


class PostPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null,
      error: false,
      isLoaded: false,
      editing: false,
      token: props.token,
      alert: '',
      deleteAlert: '',
      currentUserId: props.userId,
      deletingProcessing: false,
      editingProcessing: false
    }
    this.editPost = this.editPost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount() {
    axios.get(
      `${window.API_URL}/articles/${this.props.match.params.id}`
    ).then(res => this.setState({ post: res.data, isLoaded: true }))
    .catch( error => {
      if (!error.response) {
        this.setState({error: true})
      }
      this.setState({isLoaded: true})
    });
  }

  editPost() {
    this.setState({editing: true})
  }

  deletePost() {
    if (this.state.deletingProcessing) {
      return
    }
    this.setState({deletingProcessing: true})
    let data = {'access-token': this.state.token}
    axios.delete(
      `${window.API_URL}/articles/${this.props.match.params.id}/delete`,
      {data: data, headers: window.API_HEADERS}
    )
    .then(res => {
      setTimeout(() => {this.props.history.push("/")}, 1000)
    })
    .catch(error => {
      this.setState({deletingProcessing: false})
      if (error.response) {
        this.setState({deleteAlert: error.response.data.error})
      } else {
        this.setState({error: true})
      }
    })
  }

  // Handle form for editing
  submitForm(e) {
    e.preventDefault()
    if (this.state.editingProcessing) {
      return
    }
    this.setState({editingProcessing: true})
    let data = {
      'title': e.target.title.value,
      'text': e.target.text.value,
      'access-token': this.state.token
    }
    axios.put(
      `${window.API_URL}/articles/${this.props.match.params.id}/edit`,
      data, {headers: window.API_HEADERS}
    )
    .then(res => {
      this.setState({
        post: res.data,
        editing:false,
        editingProcessing: false
      })
    })
    .catch(error => {
      this.setState({editingProcessing: false})
      if (error.response) {
        this.setState({alert: error.response.data.error})
      } else {
        this.setState({error: true})
      }
    })
  }

  render() {
    return (
      <div className="container mt-5">
        { this.state.error? (
          <p>{window.SERVER_ERROR_MESSAGE}</p>
        ) : (
          this.state.isLoaded? (
            this.state.post? (
              <Fragment>
                { this.state.editing? (
                  <form onSubmit={this.submitForm}>
                    <input
                      className="form-control"
                      name="title"
                      type="text"
                      defaultValue={this.state.post.title}
                      required
                    ></input>
                    <textarea
                      className="form-control mt-2"
                      name="text"
                      rows="10"
                      type="text"
                      defaultValue={this.state.post.text}
                      required
                    ></textarea>
                    <p className="text-danger">{this.state.alert}</p>
                    <button
                      type="submit"
                      className="btn btn-primary mt-2 mr-2"
                    >Save</button>
                    <button
                      type="button"
                      onClick={() => this.setState({editing: false})}
                      className="btn btn-primary mt-2 "
                    >Cancel</button>
                  </form>
                ) : (
                  <div>
                    <h1
                      className="mb-4 mt-3 text-success"
                    >{this.state.post.title}</h1>
                    <p className="post-text text-primary">{this.state.post.text}</p>
                  </div>
                )}
                <hr></hr>
                <div>
                  <span className="font-italic">Posted by: </span>
                  <Link to={`/users/${this.state.post.user_id}`}>
                    <span className="btn text-primary">
                      {this.state.post['author.username']}
                    </span>
                  </Link>
                  <span> | at {this.state.post.date_posted}</span>
                </div>
                { this.state.currentUserId === this.state.post.user_id && (
                  <div>
                    <button
                      className="btn bg-primary text-white mr-2"
                      onClick={this.editPost}
                    >Edit post</button>
                    <button
                      className="btn bg-danger text-white"
                      onClick={this.deletePost}
                    >Delete post</button>
                    <p className="text-danger pt-5">{this.state.deleteAlert}</p>
                  </div>
                )}
              </Fragment>
            ) : (
              <p>Post with id={this.props.match.params.id} not found</p>
            )
          ) : (
            <p>Loading, please wait</p>
          )
        )}
      </div>
    )
  }
}

export default PostPage;
