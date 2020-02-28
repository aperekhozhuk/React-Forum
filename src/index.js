import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Keeping project settings
window.API_URL = 'https://aperekhozhuk.pythonanywhere.com'
window.SERVER_ERROR_MESSAGE = 'Ooops... Sorry, but our server is down'
window.CREDS_ALLOWED_SYMBOLS = {
  digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  low_letters: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ],
  up_letters: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ],
  spec_symbols: [
    '!', '@', '#', '$', '%', '^', '&', '*', '-', '_'
  ]
}
window.MAX_PASS_LEN = 40
window.MIN_PASS_LEN = 8
window.MAX_NAME_LEN = 20
window.MIN_NAME_LEN = 5
window.UNCORRECT_NAME_MESSAGE = `Your name should be >=5 and <=20\
  in length. It can contain English letters, digits and special symbols\
  (${window.CREDS_ALLOWED_SYMBOLS.spec_symbols})`
window.WEAK_PASS_MESSAGE = `Your password should be >=8 and <=40\
  in length. It can contain English letters, digits and special symbols\
  It should contain at least 1 lower-case, 1 upper-case letter,1 digit\
  and one special symbol (${window.CREDS_ALLOWED_SYMBOLS.spec_symbols})`

ReactDOM.render(<App />, document.getElementById('root'));