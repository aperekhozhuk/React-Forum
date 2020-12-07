import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Keeping project settings
window.API_URL = 'https://aperekhozhuk.pythonanywhere.com'
window.API_HEADERS = { 'Content-Type' : 'application/json' }
window.SERVER_ERROR_MESSAGE = 'Ooops... Sorry, but our server is down'

window.CREDS_ALLOWED_SPEC_SYMBOLS = [
  '!', '@', '#', '$', '%', '^', '&', '*', '-', '_'
]
window.PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*\\-_]).{8,40}");
window.USERNAME_REGEX = new RegExp("^[A-Za-z\\d!@#$%^&*\\-_]{5,20}$");

window.UNCORRECT_NAME_MESSAGE = `Your name should be >=5 and <=20\
  in length. It can contain English letters, digits and special symbols\
  (${window.CREDS_ALLOWED_SPEC_SYMBOLS})`
window.WEAK_PASS_MESSAGE = `Your password should be >=8 and <=40\
  in length. It can contain English letters, digits and special symbols.\
  It should contain at least 1 lower-case, 1 upper-case letter,1 digit\
  and one special symbol (${window.CREDS_ALLOWED_SPEC_SYMBOLS})`

ReactDOM.render(<App />, document.getElementById('root'));