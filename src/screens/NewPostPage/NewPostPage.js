import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';


class NewPostPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      userLoaded: props.userLoaded,
      alert: '',
      token: props.token,
      formSubmitting: false
    }
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({
        username: this.props.username,
        userLoaded: this.props.userLoaded,
        token: this.props.token
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    // If form submitting in processing - wait
    if (this.state.formSubmitting) {
      return
    }
    this.setState({alert: '', formSubmitting: true})

    const data = {
      'title': e.target.title.value,
      'text': e.target.body.value,
      'access-token': this.state.token
    }

    axios.post(`${window.API_URL}/articles/new`, data, {
      headers: window.API_HEADERS
    })
    .then(res => {
      this.setState({formSubmitting: false})
      this.props.history.push(`/posts/${res.data.id}`)
    })
    .catch( error =>
      this.setState({alert: error.response.data.error, formSubmitting: false})
    );
  }

  render() {
    return (
      <Fragment>
        { this.state.username &&
          <form className="container mt-5" onSubmit={this.submitForm}>
            <div className="form-group">
              <label>Title</label>
              <input
                name="title"
                type="text"
                className="form-control"
                placeholder="Enter title"
                required>
              </input>
            </div>
            <div className="form-group">
              <label>Text</label>
              <textarea
                name="body"
                type="text"
                className="form-control"
                placeholder="Enter text"
                rows="10"
                required>
              </textarea>
            </div>
            <p>{this.state.alert}</p>
            <button type="submit" className="btn btn-primary">Create Post</button>
          </form>
        }
        { !this.state.username &&
          <Redirect to="/login" />
        }
      </Fragment>
    )
  }
}

export default NewPostPage;
