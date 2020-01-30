import React, { Component } from 'react'
import axios from 'axios'

class NewPostPage extends Component {
  state = {
    alert: ''
  }

  submitForm(e) {
    e.preventDefault();
    this.setState({alert: ''})

    const data = {
      'userId': 1,
      'title': e.target.title.value,
      'body': e.target.body.value
    }
    const headers = {
      'Content-Type': 'application/json',
    }

    axios.post('https://jsonplaceholder.typicode.com/posts', data, {
      headers: headers
    })
    .then(res => this.setState({alert: 'Added'}))
    .catch( error =>
      this.setState({alert: 'Error'})
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
