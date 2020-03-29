/* eslint-disable */

// use this instead of line 3:
// const vs = require('validation-suite');
const vs = require('../index');

// if you only have a limited number of properties, you may want to just check them
// one by one
const myFunctionWithShortInput = function myFunctionWithShortInput(input) {
  vs.checkIsPopulatedString(input.username, 'username');
  vs.checkIsPopulatedString(input.password, 'password');
  vs.checkIsBoolean(input.isRepeatCustomer, 'isRepeatCustomer');
  vs.checkIsInteger(input.numberOfPreviousPurchases, 'numberOfPreviousPurchases');

  // code goes here
};

// if you have a input with more than about 10 properties, or if all of them should use the same
// validation, use checkIsObjectLike
const myFunctionWithLongInput = function myFunctionWithLongInput(input) {
  // the values in template don't matter - they are
  // only used in checking typeof property === 'the expected property type'
  const template = {
    username: '',
    password: '',
    isRepeatCustomer: true,
    numberOfPreviousPurchases: 1,
  };

  vs.checkIsObjectLike(input, template, 'input', { checkType: true });

  // here, we know that input has the correct properties in the correct general types
  // (number, string, object, boolean, etc.)

  for (let index = 0; index < Object.keys(template).length; index++) {
    const currentKey = Object.keys(template)[index];

    // check all string properties for zero length
    if (typeof input[currentKey] === 'number') {
      vs.checkIsInteger(input[currentKey], currentKey);
    }

    // check all string properties for zero length
    if (typeof input[currentKey] === 'string') {
      vs.checkIsPopulatedString(input[currentKey], currentKey);
    }
  }

  // code goes here
};

// => numberOfPreviousPurchases is not an integer.
myFunctionWithLongInput({
  username: 'asfd',
  password: 'asfd',
  isRepeatCustomer: true,
  numberOfPreviousPurchases: 1.3,
});

console.log();

// => password is a zero-length string.
myFunctionWithLongInput({
  username: 'asfd',
  password: '',
  isRepeatCustomer: true,
  numberOfPreviousPurchases: 1,
});
