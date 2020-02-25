import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.API_URL = 'https://aperekhozhuk.pythonanywhere.com'
window.SERVER_ERROR_MESSAGE = 'Ooops... Sorry, but our server is down'

ReactDOM.render(<App />, document.getElementById('root'));
