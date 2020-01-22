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
      throw new Error(`${variableName} is not a date later than ${someDate.toISOString()}.`);
    }
  };

  const checkIsDateLessThan = function checkIsDateLessThan(x, someDate, variableName = 'input') {
    if (!(vp.isDate(someDate))) {
      throw new Error('The date to check against is not a date.');
    }

    if (!(vp.isDateLessThan(x, someDate))) {
      throw new Error(`${variableName} is not a date less than ${someDate.toISOString()}.`);
    }
  };

  const checkIsFunction = function checkIsFunction(x, variableName = 'input') {
    if (!(vp.isFunction(x))) {
      throw new Error(`${variableName} is not a function.`);
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
    checkIsFunction,
    // checkIsFloat,
    // checkIsInteger,
    // checkIsIsoDateTimeString,
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
