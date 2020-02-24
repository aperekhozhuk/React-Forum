import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.API_URL = 'http://localhost:5000'
window.SERVER_ERROR_MESSAGE = 'Ooops... Sorry, but our server is down'

ReactDOM.render(<App />, document.getElementById('root'));