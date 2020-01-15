# validation-suite  
Superset of @tmurphree/validation-predicates and @tmurphree/validation-error-messages.

# Why and usage  
Makes input validation faster by taking care of some of the unnecesssry typing.  
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
// It returns true if the check passes, but I'm not sure you'll ever need that.  Use a simple validation instead.
checkIsPopulatedString(username, 'username');

// throws 'hasAdog is not a boolean' or returns true
checkIsBoolean(hasAdog, 'hasAdog');

// uses the default variable name 'input', so throws 'input is not a number' or returns true
checkIsNumber(foo);
```

# Change log  
Link coming soon  

# Installation  
npm install --save @tmurphree/validation-suite  

# Functions  
**All functions** do the same thing:
1. Return `true` if the validation passes.  
2. Throw an Error is the validation fails.  

The name of the function in this library appends 'check' to the name of the validation function in [@tmurphree/validation-predicates](https://www.npmjs.com/package/@tmurphree/validation-predicates).  For example, checkIsArray uses the isArray validation function.  checkIsDateBefore uses the isDateBefore validation function.  etc.  

* Parameters not in brackets are required.  
* Parameters in brackets are optional.  
* 'x' in the parameters list is the thing you want to test.  
* 'variableName' in the parameters list always defaults to 'input'.  It can be used to make the error messages more semantic.  

## checkisArray  
```
checkIsArray(x, [variableName])
```
Error message(s):  
* input is not an array.  

## checkisBigInt  
```
checkIsBigInt(x, [variableName])
```
Error message(s):  
* input is not a BigInt.  

