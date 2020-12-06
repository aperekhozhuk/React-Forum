import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer className="jumbotron mb-0 p-3 bg-muted">
        <h3 className="text-info">Runs with (links to GitHub):</h3>
        <ul>
          <li>
            <a
              href = "https://github.com/aperekhozhuk/FlaskAPI"
              className = "text-decoration-none ml-3 pd-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              BackEnd
            </a>
          </li>
          <li>
            <a
              href = "https://github.com/aperekhozhuk/React-Forum"
              className = "text-decoration-none ml-3 pd-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              FrontEnd
          </a>
          </li>
        </ul>
      </footer>
    )
  }
}

export default Footer;
