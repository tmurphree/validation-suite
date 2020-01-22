# validation-suite  
Superset of [@tmurphree/validation-predicates](https://github.com/tmurphree/validation-predicates) and [@tmurphree/validation-error-messages](https://github.com/tmurphree/validation-error-messages).

# Why and usage  
Makes input validation faster by removing unnecesssry typing.  
``` js
// The following line checks for type 'string' and zero length and returns undefined if the check passes.

// If the checks fail, it throws one of:
// * 'username is not a string.'
// * 'username is zero length.'

// The second argument tells the error message what variable name to use; if omitted, 'input' is used.

checkIsPopulatedString(username, 'username');

// returns undefined or throws 'hasAdog is not a boolean.'
checkIsBoolean(hasAdog, 'hasAdog');

// uses the default variable name 'input', so returns undefined or throws 'input is not an integer.'
checkIsInteger(foo);
```

# Change log  
[Link to change log](https://github.com/tmurphree/validation-suite/blob/master/CHANGELOG.md)  

# Installation  
npm install --save @tmurphree/validation-suite  

# In addition to the check functions  
## predicates  
All of the true / false tests from [@tmurphree/validation-predicates](https://github.com/tmurphree/validation-predicates).  
Allows you to not throw an error (or throw a completely different error).  
## errorMessages  
Everything from [@tmurphree/validation-error-messages](https://github.com/tmurphree/validation-error-messages).  
## strict mode  
Turns on strict mode in [@tmurphree/validation-predicates](https://github.com/tmurphree/validation-predicates) and [@tmurphree/validation-error-messages](https://github.com/tmurphree/validation-error-messages).  

``` js
// strict mode on
// const vs = require('@tmurphree/validation-suite').strict;

// strict mode off
const vs = require('@tmurphree/validation-suite');


const { predicates } = vs;
// const predicates = vs.predicates;

const { errorMessages } = vs;
// const errorMessages = vs.errorMessages;

// throws built-in error message
vs.checkIsString(username);

if (predicates.isInteger(userId)) {
  throw new Error('some custom error message');
}

// don't throw
if (!(predicates.isObjectLike(x, template))) {
  console.error(errorMessages.makeIsObjectLikeMessage(x, template));
}

```
# Functions  
**All functions** do the same thing:
1. Return `undefined` if the validation passes.  
2. Throw an Error is the validation fails.  

The name of the function in this library appends 'check' to the name of the validation function in [@tmurphree/validation-predicates](https://www.npmjs.com/package/@tmurphree/validation-predicates).  For example, checkIsArray uses the isArray validation function.  checkIsDateBefore uses the isDateBefore validation function.  etc.  

* Parameters not in brackets are required.  
* Parameters in brackets are optional.  
* 'x' in the parameters list is the thing you want to test.  
* 'variableName' in the parameters list always defaults to 'input'.  It can be used to make the error messages more semantic.  
* The bullet points below the syntax text are the error messages that are thrown.  

## checkisArray  
```
checkIsArray(x, [variableName])
```
* input is not an array.  

## checkisBigInt  
```
checkIsBigInt(x, [variableName])
```
* input is not a BigInt.  

