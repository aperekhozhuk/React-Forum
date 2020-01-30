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
      <div>
        <form onSubmit={this.submitForm.bind(this)} style={{display: 'flex', flexDirection: 'column'}}>
          <input name="title" type="text" placeholder="Post title" required></input><br></br><br></br>
          <textarea name="body" rows="20" placeholder="Post body" required></textarea><br></br>
          <p>{this.state.alert}</p>
          <input type="submit" value="Add post"></input>
        </form>
      </div>
    )
  }
}

export default NewPostPage;
