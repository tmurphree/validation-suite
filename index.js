/* eslint no-unused-vars:'warn', no-undef:'warn' */

const vem = require('@tmurphree/validation-error-messages');
const vp = require('@tmurphree/validation-predicates');

const main = function main(args = { strict: false }) {
  const checkType = function checkType(x, expected) {
    // eslint-disable-next-line valid-typeof
    return typeof x === expected;
  };

  // #region simple "is" functions

  const checkIsArray = function checkIsArray(x, variableName = 'input') {
    if (!(vp.isArray(x))) {
      throw new Error(`${variableName} is not an array.`);
    }
  };

  const checkIsBgInt = function checkIsBgInt(x, variableName = 'input') {
    if (!(vp.isBigInt(x))) {
      throw new Error(`${variableName} is not a BigInt.`);
    }
  };

  const checkIsBoolean = function checkIsBoolean(x, variableName = 'input') {
    if (!(vp.isBoolean(x))) {
      throw new Error(`${variableName} is not a boolean.`);
    }
  };

  const checkIsDate = function checkIsDate(x, variableName = 'input') {
    if (!(vp.isDate(x))) {
      throw new Error(`${variableName} is not a date.`);
    }
  };

  const checkIsDateGreaterThan = function checkIsDateGreaterThan(x, someDate, variableName = 'input') {
    if (!(vp.isDate(someDate))) {
      throw new Error('The date to check against is not a date.');
    }

    checkIsDate(x, variableName);

    if (!(vp.isDateGreaterThan(x, someDate))) {
      throw new Error(`${variableName} is not a date after ${someDate.toISOString()}.`);
    }
  };

  const checkIsDateLessThan = function checkIsDateLessThan(x, someDate, variableName = 'input') {
    if (!(vp.isDate(someDate))) {
      throw new Error('The date to check against is not a date.');
    }

    checkIsDate(x, variableName);

    if (!(vp.isDateLessThan(x, someDate))) {
      throw new Error(`${variableName} is not a date before ${someDate.toISOString()}.`);
    }
  };

  const checkIsFloat = function checkIsFloat(x, variableName = 'input') {
    if (!(vp.isFloat(x))) {
      throw new Error(`${variableName} is not a floating point number.`);
    }
  };

  const checkIsFunction = function checkIsFunction(x, variableName = 'input') {
    if (!(vp.isFunction(x))) {
      throw new Error(`${variableName} is not a function.`);
    }
  };

  const checkIsInteger = function checkIsInteger(x, variableName = 'input') {
    if (!(vp.isInteger(x))) {
      throw new Error(`${variableName} is not an integer.`);
    }
  };

  const checkIsIsoDateTimeString = function checkIsIsoDateTimeString(x, variableName = 'input') {
    if (!(vp.isIsoDateTimeString(x))) {
      throw new Error(`${variableName} is not an ISO date time string in a supported layout.  See the documentation https://github.com/tmurphree/validation-predicates.`);
    }
  };


  const checkIsNull = function checkIsNull(x, variableName = 'input') {
    if (!(vp.isNull(x))) {
      throw new Error(`${variableName} is not null.`);
    }
  };


  return {
    checkIsArray,
    checkIsBgInt,
    checkIsBoolean,
    checkIsDate,
    checkIsDateAfter: checkIsDateGreaterThan,
    checkIsDateBefore: checkIsDateLessThan,
    checkIsDateGreaterThan,
    checkIsDateLessThan,
    checkIsFloat,
    checkIsFunction,
    checkIsInteger,
    checkIsIsoDateTimeString,
    checkIsNull,
    // checkIsNullOrUndefined,
    // checkIsNumber,
    // checkIsNumberGreaterThan,
    // checkIsNumberLessThan,
    // checkIsObject,
    // checkIsObjectLike,
    // checkIsObjectWithExpectedProps,
    // checkIsPopulatedArray,
    // checkIsPopulatedObject,
    // checkIsPopulatedString,
    // checkIsString,
    // checkIsSymbol,
    // checkIsUndefined,
    // checkIsZeroLength,
  };
};

module.exports = {
  ...main(),
  errorMessages: vem,
  predicates: vp,
  strict: { ...main({ strict: true }) },

};
