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
npm install --save validation-suite  

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

## checkIsBoolean  
```
checkIsBoolean(x, [variableName])
```
* input is not a boolean.  

## checkIsDate  
```
checkIsDate(x, [variableName])
```
* input is not a date.  

## checkIsDateAfter  
Alias of checkIsDateGreaterThan.  

## checkIsDateBefore  
Alias of checkIsDateLessThan.  

## checkIsDateGreaterThan     
Checks that a date is greater than (after) another date.  
```
checkIsDateGreaterThan(x, someDate, [variableName])
```
If someDate is not a date:  
* The date to check against is not a date.  

Else:  
* input is not a date.  
* input is not a date after someDate.toISOString().  
e.g. 'input is not a date after 2099-10-02T00:00:00.000Z.'  

## checkIsDateLessThan     
Checks that a date is less than (before) another date.  
```
checkIsDateLessThan(x, someDate, [variableName])
```
If someDate is not a date:  
* The date to check against is not a date.  

Else:  
* input is not a date.  
* input is not a date before someDate.toISOString().  
e.g. 'input is not a date before 2099-10-02T00:00:00.000Z.'  

## checkIsFloat   
x is a number (see checkIsNumber) and has a nonzero decimal. e.g. 5.0 is NOT a float, but 5.01 is.   
```
checkIsFloat(x, [variableName])
```
* input is not a floating point number.  

## checkIsFunction  
```
checkIsFunction(x, [variableName])
```
* input is not a function.  

## checkIsInteger  
x is a number (see checkIsNumber) and has a zero-value decimal. e.g. 5 and 5.0 are both integers, but 5.01 is NOT.  
```
checkIsInteger(x, [variableName])
```
* input is not an integer.  

## checkIsIsoDateTimeString  
x is a string and matches a subset of the ISO 8601 date time string format.  See the documentation [https://github.com/tmurphree/validation-predicates]().  
```
checkIsIsoDateTimeString(x, [variableName])
```
* input is not an ISO date time string in a supported layout.  See the documentation https://github.com/tmurphree/validation-predicates.   

## checkIsNull  
```
checkIsNull(x, [variableName])
```
* input is not null.  
      
## checkIsNullOrUndefined   
The checks in the root of this library check for something positive.  E.g. checkIsArray passes if the input is an array.  The same applies here: this function passes if the input is null or undefined.  Consider using `vs.not.checkIsNotNullOrUndefined` if this is not what you want.  
```
checkIsNullOrUndefined(x, [variableName])
```
* input is not null or undefined. 

## checkIsNumber  
Fails for NaN.  
```
checkIsNumber(x, [variableName])
```
* input is not a number or is NaN.   

## checkIsNumberGreaterThan  
```
checkIsNumberGreaterThan(x, someNumber, [variableName])
```
If someNumber is not a number:  
* The number to check against is not a number or is NaN.  

Else:  
* input is not a number or is NaN.  
* input is not a number greater than someNumber.  
e.g. 'input is not a number greater than 42.'  

## checkIsNumberLessThan  
```
checkIsNumberLessThan(x, someNumber, [variableName])
```
If someNumber is not a number:  
* The number to check against is not a number or is NaN.  

Else:  
* input is not a number or is NaN.  
* input is not a number less than someNumber.  
e.g. 'input is not a number less than 42.' 

## checkIsObject  
Fails for null.  
x is an object per the definition in 'typeof' EXCEPT that it returns false for null.  Basically, this means it isn't another known type of primitive and is not null.  See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).  
```
checkIsObject(x, [variableName])
```
* input is not an object or is null.  

## checkIsObjectLike  
x is an object and has exactly the same own properties as template (by default).  
If options.allowExtraProps is true, x can have more properties than template.  
See [https://github.com/tmurphree/validation-predicates]().  Everything, even the strict mode guidance, is exactly the same.  
```
isObjectLike(x, template, [variableName], [options={ allowExtraProps: false, checkType: false, debug: false }])
```
If template is not an object:  
* The template object is not an object or is null.  

'foo' in the following examples is the pertinent property name.  

Else:  
* input is not an object.  
* input is missing at least property foo.  
* input has at least one additional property foo.  

When `options.checkType` = true (the default in strict mode):  
* input.foo is type actualType and expected type expectedType.  
e.g. 'input.foo is type string and expected type number.'  

## checkIsObjectWithExpectedProps  
```
checkIsObjectWithExpectedProps(x, expectedProperties, [variableName])
```
If expectedProperties is not an array, is an empty array, or has an non-string values:  
* expectedProperties is not an array of strings.  

'foo' in the following examples is the pertinent property name.  

Else:  
* input is not an object.  
* input is missing at least property foo.  

## checkIsPopulatedArray  
```
checkIsPopulatedArray(x, [variableName])
```
* input is not an array.  
* input is a zero-length array.  

## checkIsPopulatedObject  
```
checkIsPopulatedObject(x, [variableName])
```
* input is not an object or is null.  
* input is an object with no non-inherited properties.  

## checkIsPopulatedString  
```
checkIsPopulatedString(x, [variableName])
```
* input is not a string.  
* input is a zero-length string.  

## checkIsString  
```
checkIsString(x, [variableName])
```
* input is not a string.  

## checkIsSymbol  
```
checkIsSymbol(x, [variableName])
```
* input is not a symbol.  

## checkIsUndefined  
```
checkIsUndefined(x, [variableName])
```
* input is not undefined.  

## checkIsZeroLength  
```
checkIsZeroLength(x, [variableName])
```
* input does not have a length property, or that property does not equal zero.  

# "not" functions  
Check for a negative.  In a separate namespace because it's very hard to differentiate `checkIsNullOrUndefined` and `checkIsNotNullOrUndefined`.  It's easier differentiate `vs.checkIsNullOrUndefined` and `vs.not.checkIsNotNullOrUndefined`.  

``` js
// use with 'vs.not'
const vs = require('@tmurphree/validation-suite');

vs.not.checkIsNotNullOrUndefined(userId);
```
## not.checkIsNotNullOrUndefined
```
vs.not.checkIsNotNullOrUndefined(userId);
```
* input is null  
* input is undefined  

