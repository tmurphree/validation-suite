# validation-suite  
Superset of @tmurphree/validation-predicates and @tmurphree/validation-error-messages.

# Why  
Makes input validation faster by taking care of some of the unnecesssry typing.  

# Change log  
Link coming soon  

# Installation  
npm install --save @tmurphree/validation-suite  

# Usage  
``` js
// initially, we had to type out everything
if (typeof username !== 'string') {
  throw new Error('username is not a string');
}

if (username.length === 0) {
  throw new Error('username is zero length.');
}

// assert takes care of some of the 'if' code, but you still have to type the error messages.
// Plus it's only in Node as far as I know.
// https://nodejs.org/dist/latest-v12.x/docs/api/assert.html#assert_assert_ok_value_message
assert.ok(typeof username !== 'string', 'username is not a string');
assert.ok(username.length === 0, 'username is zero length.');

// This library gives you less typing and more checks.
// The following line checks for type 'string' and zero length and throws the same error messages as above.
// The second 'username' argument tells the error message what variable name to use; if omitted, 'input' is used.
// It returns true if the check passes, but I'm not sure you'll ever need that.
checkIsPopulatedString(username, 'username');
```

# Functions  
