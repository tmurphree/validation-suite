// use this instead of line 3:
// const vs = require('validation-suite');
const vs = require('../index');

const myFunction = function myFunction(username, password) {
  vs.checkIsPopulatedString(username, 'username');
  vs.checkIsPopulatedString(password, 'password');

  // code goes here
};
