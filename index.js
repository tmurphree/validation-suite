const vem = require('@tmurphree/validation-error-messages');
const vp = require('@tmurphree/validation-predicates');

const main = function main(args = { strict: false }) {
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

  /**
   * @description The checks in the root of this library check for something positive.
   *    E.g. checkIsArray passes if the input is an array.  The same applies here: this
   *    function passes if the input is null or undefined.  Consider using
   *    vs.not.checkIsNotNullOrUndefined if this is not what you want.
   * @param {any} x The thing to check.
   * @param {string} [variableName='input'] The variable name to use.
   */
  const checkIsNullOrUndefined = function checkIsNullOrUndefined(x, variableName = 'input') {
    if (!(vp.isNullOrUndefined(x))) {
      throw new Error(`${variableName} is not null or undefined.`);
    }
  };

  const checkIsNumber = function checkIsNumber(x, variableName = 'input') {
    if (!(vp.isNumber(x))) {
      throw new Error(`${variableName} is not a number or is NaN.`);
    }
  };

  const checkIsNumberGreaterThan = function checkIsNumberGreaterThan(x, someNumber, variableName = 'input') {
    if (!(vp.isNumber(someNumber))) {
      throw new Error('The number to check against is not a number or is NaN.');
    }

    checkIsNumber(x, variableName);

    if (!(vp.isNumberGreaterThan(x, someNumber))) {
      throw new Error(`${variableName} is not a number greater than ${someNumber}.`);
    }
  };

  const checkIsNumberLessThan = function checkIsNumberLessThan(x, someNumber, variableName = 'input') {
    if (!(vp.isNumber(someNumber))) {
      throw new Error('The number to check against is not a number or is NaN.');
    }

    checkIsNumber(x, variableName);

    if (!(vp.isNumberLessThan(x, someNumber))) {
      throw new Error(`${variableName} is not a number less than ${someNumber}.`);
    }
  };

  const checkIsObject = function checkIsObject(x, variableName = 'input') {
    if (!(vp.isObject(x))) {
      throw new Error(`${variableName} is not an object or is null.`);
    }
  };

  /**
   * @description Compare two objects.  Throw if the objects do not have exactly the
   *    same properties.  Optionally do a basic type check with typeof and throw
   *    if the types are different.
   * @param {object} x The object to test.
   * @param {object} template The object you want x to look like.
   * @param {string} [variableName=input] The name you want printed in the message.
   * @param {object} [options]
   * @param {boolean} [options.allowExtraProps=false] Return undefined if the object to test has
   *   properties not in template and other tests pass.
   * @param {boolean} [options.checkType=false] Defaults to true in strict mode.
   *    If true check property data types.
   * @param {boolean} [options.debug=false] Print verbose reasons why the validation
   *    failed.  This is mainly used when the true / false function is by itself and
   *    may be redundant in this library because failure reasons are thrown.
   * @returns {undefined} undefined
  */
  const checkIsObjectLike = function checkIsObjectLike(
    x,
    template,
    variableName = 'input',
    options = {}
  ) {
    if (!(vp.isObject(template))) {
      throw new Error('The template object is not an object or is null.');
    }

    if (!(vp.isObject(options))) {
      throw new Error('options is not an object or is null.');
    }

    // #region set options
    const copyOfOptions = { ...options };
    const defaults = {
      allowExtraProps: false,
      checkType: args.strict,
      debug: false,
    };

    for (let index = 0; index < Object.keys(defaults).length; index++) {
      const currentKey = Object.keys(defaults)[index];

      if (copyOfOptions[currentKey] === undefined) {
        copyOfOptions[currentKey] = defaults[currentKey];
      }
    }
    // #endregion set options

    if (!(vp.isObjectLike(x, template, { ...copyOfOptions }))) {
      throw new Error(
        vem.makeIsObjectLikeMessage(x, template, variableName, { ...copyOfOptions })
      );
    }
  };

  const checkIsObjectWithExpectedProps = function checkIsObjectWithExpectedProps(
    x,
    expectedProperties,
    variableName = 'input'
  ) {
    if (!(vp.isPopulatedArray(expectedProperties)) || expectedProperties.some((el) => typeof el !== 'string')) {
      throw new Error('expectedProperties is not an array of strings.');
    }

    if (!(vp.isObjectWithExpectedProps(x, expectedProperties))) {
      throw new Error(
        vem.makeIsObjectWithExpectedPropsMessage(x, expectedProperties, variableName)
      );
    }
  };

  const checkIsPopulatedArray = function checkIsPopulatedArray(x, variableName = 'input') {
    checkIsArray(x, variableName);

    if (!(vp.isPopulatedArray(x))) {
      throw new Error(`${variableName} is a zero-length array.`);
    }
  };

  const checkIsPopulatedObject = function checkIsPopulatedObject(x, variableName = 'input') {
    checkIsObject(x, variableName);

    if (!(vp.isPopulatedObject(x))) {
      throw new Error(`${variableName} is an object with no non-inherited properties.`);
    }
  };

  const checkIsString = function checkIsString(x, variableName = 'input') {
    if (!(vp.isString(x))) {
      throw new Error(`${variableName} is not a string.`);
    }
  };

  // leave this here because it relies on checkIsString
  const checkIsPopulatedString = function checkIsPopulatedString(x, variableName = 'input') {
    checkIsString(x, variableName);

    if (!(vp.isPopulatedString(x))) {
      throw new Error(`${variableName} is a zero-length string.`);
    }
  };

  const checkIsSymbol = function checkIsSymbol(x, variableName = 'input') {
    if (!(vp.isSymbol(x))) {
      throw new Error(`${variableName} is not a symbol.`);
    }
  };

  const checkIsUndefined = function checkIsUndefined(x, variableName = 'input') {
    if (!(vp.isUndefined(x))) {
      throw new Error(`${variableName} is not undefined.`);
    }
  };

  const checkIsZeroLength = function checkIsZeroLength(x, variableName = 'input') {
    if (!(vp.isZeroLength(x))) {
      throw new Error(`${variableName} does not have a length property, or that property does not equal zero.`);
    }
  };
  // #endregion 'is' functions

  // #region 'not' functions
  /**
   * @description The checks in the root of this library check for something positive.
   *    E.g. checkIsArray passes if the item is an array.  The opposite applies here:
   *    these functions throw if the input IS matched by the validator.
   * @returns {object}
  */
  const notFunctions = function notFunctions() {
    const checkIsNotNullOrUndefined = function checkIsNotNullOrUndefined(x, variableName = 'input') {
      if (vp.isNull(x)) {
        throw new Error(`${variableName} is null.`);
      }

      if (vp.isUndefined(x)) {
        throw new Error(`${variableName} is undefined.`);
      }
    };

    return { checkIsNotNullOrUndefined };
  };
  // #endregion 'not' functions

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
    checkIsNullOrUndefined,
    checkIsNumber,
    checkIsNumberGreaterThan,
    checkIsNumberLessThan,
    checkIsObject,
    checkIsObjectLike,
    checkIsObjectWithExpectedProps,
    checkIsPopulatedArray,
    checkIsPopulatedObject,
    checkIsPopulatedString,
    checkIsString,
    checkIsSymbol,
    checkIsUndefined,
    checkIsZeroLength,
    not: { ...notFunctions() },
  };
};

module.exports = {
  ...main(),
  errorMessages: vem,
  predicates: vp,
  strict: { ...main({ strict: true }) },
};
