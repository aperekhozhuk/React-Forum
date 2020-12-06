import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer className="jumbotron mb-0 p-3 bg-muted">
        <h1 className="text-info">
          <h2>Links:</h2>
            <p>
              <a href = "https://github.com/aperekhozhuk/FlaskAPI" target="_blank">
                Back end (GitHub)
              </a>
            </p>
            <p>
              <a href = "https://github.com/aperekhozhuk/React-Forum" target="_blank">
                Front End (GitHub)
              </a>
            </p>
        </h1>
      </footer>
    )
  }
}

export default Footer;
