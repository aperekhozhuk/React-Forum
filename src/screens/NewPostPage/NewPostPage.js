import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'


class NewPostPage extends Component {
  state = {
    alert: '',
    token: Cookies.get('access-token')
  }

  submitForm(e) {
    e.preventDefault();
    this.setState({alert: ''})

    const data = {
      'title': e.target.title.value,
      'text': e.target.body.value,
      'access-token': this.state.token
    }
    const headers = {
      'Content-Type': 'application/json',
    }

    axios.post('http://localhost:5000/articles/new', data, {
      headers: headers
    })
    .then(res => this.props.history.push(`/posts/${res.data.id}`))
    .catch( error =>
      this.setState({alert: error.response.data.error})
    );
  }

  render() {
    return (
      <form className="container mt-5" onSubmit={this.submitForm.bind(this)}>
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
    )
  }
}

export default NewPostPage;
