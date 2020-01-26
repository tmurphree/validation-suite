/* eslint no-undef:"off" */

/**
 * @fileoverview Test functions in the vs root namespace.
*/

require('dotenv').config();

const vs = require('../index.js');

// #region jasmine setup
const origTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

const revertJasmineTimeout = function revertJasmineTimeout() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = origTimeout;
};

const setJasmineTimeout = function setJasmineTimeout(milliseconds) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = milliseconds;
};

// you can set more options than are shown here: see https://jasmine.github.io/api/edge/Reporter.html
// tutorial: https://jasmine.github.io/tutorials/custom_reporter
const myReporter = {
  jasmineStarted: function jasmineStarted(suiteInfo, done) {
    // optional setup goes here
    setJasmineTimeout(10000);
    done();
  },
  jasmineDone: function jasmineDone(suiteInfo, done) {
    console.log(`Tests ended ${new Date().toLocaleString()}`);
    revertJasmineTimeout();
    done();
  },
};

jasmine.getEnv().addReporter(myReporter);
// #endregion jasmine setup

describe('checkIsArray', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsArray('badInput'); }).toThrowError('input is not an array.');

    // different variable name
    expect(() => { vs.checkIsArray('badInput', 'charles'); }).toThrowError('charles is not an array.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsArray([])).toBeUndefined();
  });
});

describe('checkIsBgInt', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsBgInt('badInput'); }).toThrowError('input is not a BigInt.');

    // different variable name
    expect(() => { vs.checkIsBgInt('badInput', 'charles'); }).toThrowError('charles is not a BigInt.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsBgInt(BigInt(12))).toBeUndefined();
  });
});

describe('checkIsBoolean', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsBoolean('badInput'); }).toThrowError('input is not a boolean.');

    // different variable name
    expect(() => { vs.checkIsBoolean('badInput', 'charles'); }).toThrowError('charles is not a boolean.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsBoolean(false)).toBeUndefined();
  });
});

describe('checkIsDate', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsDate('badInput'); }).toThrowError('input is not a date.');

    // different variable name
    expect(() => { vs.checkIsDate('badInput', 'charles'); }).toThrowError('charles is not a date.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsDate(new Date())).toBeUndefined();
  });
});

describe('checkIsDateAfter', () => {
  it('is an alias of checkIsDateGreaterThan', () => {
    expect(vs.checkIsDateAfter).toEqual(vs.checkIsDateGreaterThan);
  });
});

describe('checkIsDateBefore', () => {
  it('is an alias of checkIsDateLessThan', () => {
    expect(vs.checkIsDateBefore).toEqual(vs.checkIsDateLessThan);
  });
});

describe('checkIsDateGreaterThan', () => {
  it('throws on bad input', () => {
    const someDate = new Date(Date.UTC(2099, 9, 2, 0, 0, 0));

    // validate someDate
    expect(() => { vs.checkIsDateGreaterThan('badInput', 'moreBadInput'); })
      .toThrowError('The date to check against is not a date.');

    // validate x
    expect(() => { vs.checkIsDateGreaterThan('badInput', someDate); })
      .toThrowError('input is not a date.');
    expect(() => { vs.checkIsDateGreaterThan(new Date(2001, 9, 1), someDate); })
      .toThrowError('input is not a date after 2099-10-02T00:00:00.000Z.');

    // different variable name
    expect(() => { vs.checkIsDateGreaterThan('badInput', someDate, 'charles'); }).toThrowError('charles is not a date.');
    expect(() => { vs.checkIsDateGreaterThan(new Date(2001, 9, 1), someDate, 'charles'); })
      .toThrowError('charles is not a date after 2099-10-02T00:00:00.000Z.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsDateGreaterThan(new Date(2001), new Date(1970))).toBeUndefined();
  });
});

describe('checkIsDateLessThan', () => {
  it('throws on bad input', () => {
    const someDate = new Date(Date.UTC(1999, 9, 2, 0, 0, 0));

    // validate someDate
    expect(() => { vs.checkIsDateLessThan('badInput', 'moreBadInput'); })
      .toThrowError('The date to check against is not a date.');

    // validate x
    expect(() => { vs.checkIsDateLessThan('badInput', someDate); })
      .toThrowError('input is not a date.');
    expect(() => { vs.checkIsDateLessThan(new Date(2001, 9, 1), someDate); })
      .toThrowError('input is not a date before 1999-10-02T00:00:00.000Z.');

    // different variable name
    expect(() => { vs.checkIsDateLessThan('badInput', someDate, 'charles'); }).toThrowError('charles is not a date.');
    expect(() => { vs.checkIsDateLessThan(new Date(2001, 9, 1), someDate, 'charles'); })
      .toThrowError('charles is not a date before 1999-10-02T00:00:00.000Z.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsDateLessThan(new Date(1980), new Date(2033))).toBeUndefined();
  });
});

describe('checkIsFloat', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsFloat('badInput'); })
      .toThrowError('input is not a floating point number.');

    // integer
    expect(() => { vs.checkIsFloat(1); })
      .toThrowError('input is not a floating point number.');

    // different variable name
    expect(() => { vs.checkIsFloat('badInput', 'charles'); })
      .toThrowError('charles is not a floating point number.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsFloat(12.5)).toBeUndefined();
  });
});

describe('checkIsFunction', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsFunction('badInput'); }).toThrowError('input is not a function.');

    // different variable name
    expect(() => { vs.checkIsFunction('badInput', 'charles'); }).toThrowError('charles is not a function.');
  });

  it('returns undefined', () => {
    const funFunFunction = () => true;
    expect(vs.checkIsFunction(funFunFunction)).toBeUndefined();
  });
});

describe('checkIsInteger', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsInteger('badInput'); })
      .toThrowError('input is not an integer.');

    expect(() => { vs.checkIsInteger(4.554); })
      .toThrowError('input is not an integer.');

    // different variable name
    expect(() => { vs.checkIsInteger('badInput', 'charles'); })
      .toThrowError('charles is not an integer.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsInteger(5)).toBeUndefined();
    expect(vs.checkIsInteger(5.0)).toBeUndefined();
  });
});

describe('checkIsIsoDateTimeString', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsIsoDateTimeString('badInput'); })
      .toThrowError('input is not an ISO date time string in a supported layout.  See the documentation https://github.com/tmurphree/validation-predicates.');

    // different variable name
    expect(() => { vs.checkIsIsoDateTimeString('badInput', 'charles'); })
      .toThrowError('charles is not an ISO date time string in a supported layout.  See the documentation https://github.com/tmurphree/validation-predicates.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsIsoDateTimeString('1999-10-02T00:00:00.000Z')).toBeUndefined();
  });
});

describe('checkIsNull', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsNull({}); }).toThrowError('input is not null.');

    // different variable name
    expect(() => { vs.checkIsNull('badInput', 'charles'); }).toThrowError('charles is not null.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsNull(null)).toBeUndefined();
  });
});

describe('checkIsNullOrUndefined', () => {
  it('throws on bad input', () => {
    const emptyObject = {};

    expect(() => { vs.checkIsNullOrUndefined('badInput'); }).toThrowError('input is not null or undefined.');
    expect(() => { vs.checkIsNullOrUndefined(0); }).toThrowError('input is not null or undefined.');
    expect(() => { vs.checkIsNullOrUndefined(false); }).toThrowError('input is not null or undefined.');

    expect(() => { vs.checkIsNullOrUndefined(emptyObject); }).toThrowError('input is not null or undefined.');
    expect(() => { vs.checkIsNullOrUndefined({}); }).toThrowError('input is not null or undefined.');
    expect(() => { vs.checkIsNullOrUndefined(''); }).toThrowError('input is not null or undefined.');
    expect(() => { vs.checkIsNullOrUndefined(NaN); }).toThrowError('input is not null or undefined.');

    // different variable name
    expect(() => { vs.checkIsNullOrUndefined({}, 'charles'); }).toThrowError('charles is not null or undefined.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsNullOrUndefined(null)).toBeUndefined();
    expect(vs.checkIsNullOrUndefined(undefined)).toBeUndefined();
  });
});

describe('checkIsNumber', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsNumber('badInput'); }).toThrowError('input is not a number or is NaN.');
    expect(() => { vs.checkIsNumber(NaN); }).toThrowError('input is not a number or is NaN.');

    // different variable name
    expect(() => { vs.checkIsNumber('badInput', 'charles'); }).toThrowError('charles is not a number or is NaN.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsNumber(13)).toBeUndefined();
    expect(vs.checkIsNumber(Infinity)).toBeUndefined();
  });
});

describe('checkIsNumberGreaterThan', () => {
  it('throws on bad input', () => {
    // validate someNumber
    expect(() => { vs.checkIsNumberGreaterThan('badInput', 'moreBadInput'); })
      .toThrowError('The number to check against is not a number or is NaN.');
    expect(() => { vs.checkIsNumberGreaterThan('badInput', NaN); })
      .toThrowError('The number to check against is not a number or is NaN.');

    // validate x
    expect(() => { vs.checkIsNumberGreaterThan('badInput', 900); })
      .toThrowError('input is not a number or is NaN.');
    expect(() => { vs.checkIsNumberGreaterThan(NaN, 900); })
      .toThrowError('input is not a number or is NaN.');
    expect(() => { vs.checkIsNumberGreaterThan(3, 900); })
      .toThrowError('input is not a number greater than 900.');

    // different variable name
    expect(() => { vs.checkIsNumberGreaterThan('badInput', 900, 'charles'); })
      .toThrowError('charles is not a number or is NaN.');
    expect(() => { vs.checkIsNumberGreaterThan(2, 900, 'charles'); })
      .toThrowError('charles is not a number greater than 900.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsNumberGreaterThan(90, 4.3)).toBeUndefined();
  });
});

describe('checkIsNumberLessThan', () => {
  it('throws on bad input', () => {
    // validate someNumber
    expect(() => { vs.checkIsNumberLessThan('badInput', 'moreBadInput'); })
      .toThrowError('The number to check against is not a number or is NaN.');
    expect(() => { vs.checkIsNumberLessThan('badInput', NaN); })
      .toThrowError('The number to check against is not a number or is NaN.');

    // validate x
    expect(() => { vs.checkIsNumberLessThan('badInput', 900); })
      .toThrowError('input is not a number or is NaN.');
    expect(() => { vs.checkIsNumberLessThan(NaN, 900); })
      .toThrowError('input is not a number or is NaN.');
    expect(() => { vs.checkIsNumberLessThan(900, 2); })
      .toThrowError('input is not a number less than 2.');

    // different variable name
    expect(() => { vs.checkIsNumberLessThan('badInput', 900, 'charles'); })
      .toThrowError('charles is not a number or is NaN.');
    expect(() => { vs.checkIsNumberLessThan(900, 2, 'charles'); })
      .toThrowError('charles is not a number less than 2.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsNumberLessThan(1.9, 455)).toBeUndefined();
  });
});

describe('checkIsObject', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsObject('badInput'); }).toThrowError('input is not an object or is null.');
    expect(() => { vs.checkIsObject(null); }).toThrowError('input is not an object or is null.');

    // different variable name
    expect(() => { vs.checkIsObject('badInput', 'charles'); }).toThrowError('charles is not an object or is null.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsObject({ a: 'd' })).toBeUndefined();
    expect(vs.checkIsObject([1, 3, 4])).toBeUndefined();
    expect(vs.checkIsObject(new Date())).toBeUndefined();
  });
});

describe('checkIsObjectLike', () => {
  const template = { a: 1, b: 2, c: 3 };
  it('throws on bad input', () => {
    expect(() => (vs.checkIsObjectLike()))
      .toThrowError('The template object is not an object or is null.');

    expect(() => (vs.checkIsObjectLike(99)))
      .toThrowError('The template object is not an object or is null.');

    expect(() => (vs.checkIsObjectLike({ foo: 12 }, 12)))
      .toThrowError('The template object is not an object or is null.');
  });

  it('returns an error messages for non-objects', () => {
    expect(() => (vs.checkIsObjectLike('notanobject', template)))
      .toThrowError('input is not an object.');

    expect(() => (vs.checkIsObjectLike(null, template)))
      .toThrowError('input is not an object.');

    expect(() => (vs.checkIsObjectLike(undefined, template)))
      .toThrowError('input is not an object.');
  });

  it('returns undefined if no differences', () => {
    expect(vs.checkIsObjectLike({ a: 1, b: 2, c: 3 }, template)).toBeUndefined();
  });

  it('returns an error message for objects', () => {
    // x is missing property b
    expect(() => (vs.checkIsObjectLike({ a: 1, c: 3 }, template)))
      .toThrowError('input is missing at least property b.');

    // x is missing property b and has additional property z
    // we look for missing properties first
    expect(() => (vs.checkIsObjectLike({ a: 1, c: 3, z: 4 }, template)))
      .toThrowError('input is missing at least property b.');

    // x has all of template plus property d
    expect(() => (vs.checkIsObjectLike({ a: 1, b: 2, c: 3, d: 4 }, template)))
      .toThrowError('input has at least one additional property d.');
  });

  it('returns on the first missing property when more than one property is missing', () => {
    // x is missing properties b and c
    expect(() => (vs.checkIsObjectLike({ a: 1 }, template)))
      .toThrowError('input is missing at least property b.');
  });

  it('lets you change the variable name in the output', () => {
    expect(() => (vs.checkIsObjectLike('notanobject', template, 'charles')))
      .toThrowError('charles is not an object.');

    // x is missing property b
    expect(() => (vs.checkIsObjectLike({ a: 1, c: 3 }, template, 'charles')))
      .toThrowError('charles is missing at least property b.');

    // x has all of template plus property d
    expect(() => (vs.checkIsObjectLike({ a: 1, b: 2, c: 3, d: 4 }, template, 'charles')))
      .toThrowError('charles has at least one additional property d.');
  });
});

describe('checkIsObjectWithExpectedProps', () => {
  expectedProperties = ['userId', 'password'];

  it('throws on bad input', () => {
    expect(() => (vs.checkIsObjectWithExpectedProps({ a: 'ok' })))
      .toThrowError('expectedProperties is not an array of strings.');

    expect(() => (vs.checkIsObjectWithExpectedProps({ a: 'ok' }, 12)))
      .toThrowError('expectedProperties is not an array of strings.');

    // empty array
    expect(() => (vs.checkIsObjectWithExpectedProps({ a: 'ok' }, [])))
      .toThrowError('expectedProperties is not an array of strings.');

    // some array elements not strings
    expect(() => (vs.checkIsObjectWithExpectedProps({ a: 'ok' }, ['a', 123])))
      .toThrowError('expectedProperties is not an array of strings.');
  });

  it('throws for non-objects', () => {
    expect(() => (vs.checkIsObjectWithExpectedProps('notanobject', expectedProperties)))
      .toThrowError('input is not an object.');

    expect(() => (vs.checkIsObjectWithExpectedProps(null, expectedProperties)))
      .toThrowError('input is not an object.');

    expect(() => (vs.checkIsObjectWithExpectedProps(undefined, expectedProperties)))
      .toThrowError('input is not an object.');
  });

  it('returns undefined if everything is there', () => {
    expect(vs.checkIsObjectWithExpectedProps({ userId: 'a', password: 'b' }, expectedProperties))
      .toBeUndefined();
  });

  it('throws if a property is missing', () => {
    // x is missing property password
    expect(() => (vs.checkIsObjectWithExpectedProps({ userId: 'a' }, expectedProperties)))
      .toThrowError('input is missing at least property password.');
  });

  it('lets you change the variable name in the output', () => {
    expect(() => (vs.checkIsObjectWithExpectedProps('notanobject', expectedProperties, 'charles')))
      .toThrowError('charles is not an object.');

    // x is missing property password
    expect(() => (vs.checkIsObjectWithExpectedProps({ userId: 'a' }, expectedProperties, 'charles')))
      .toThrowError('charles is missing at least property password.');
  });
});

describe('checkIsPopulatedArray', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsPopulatedArray('badInput'); })
      .toThrowError('input is not an array.');

    expect(() => { vs.checkIsPopulatedArray([]); })
      .toThrowError('input is a zero-length array.');

    // different variable name
    expect(() => { vs.checkIsPopulatedArray([], 'charles'); })
      .toThrowError('charles is a zero-length array.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsPopulatedArray([5])).toBeUndefined();
  });
});

describe('checkIsPopulatedObject', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsPopulatedObject('badInput'); })
      .toThrowError('input is not an object or is null.');

    expect(() => { vs.checkIsPopulatedObject({}); })
      .toThrowError('input is an object with no non-inherited properties.');

    expect(() => { vs.checkIsPopulatedObject(null); })
      .toThrowError('input is not an object or is null.');

    // different variable name
    expect(() => { vs.checkIsPopulatedObject({}, 'charles'); })
      .toThrowError('charles is an object with no non-inherited properties.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsPopulatedObject({ a: 5 })).toBeUndefined();
  });
});

describe('checkIsPopulatedString', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsPopulatedString(12); })
      .toThrowError('input is not a string.');

    expect(() => { vs.checkIsPopulatedString(''); })
      .toThrowError('input is a zero-length string.');

    // different variable name
    expect(() => { vs.checkIsPopulatedString('', 'charles'); })
      .toThrowError('charles is a zero-length string.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsPopulatedString('{ a: 5 }')).toBeUndefined();
  });
});

describe('checkIsString', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsString(12); })
      .toThrowError('input is not a string.');

    // different variable name
    expect(() => { vs.checkIsString(undefined, 'charles'); })
      .toThrowError('charles is not a string.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsString('{ a: 5 }')).toBeUndefined();
    expect(vs.checkIsString('')).toBeUndefined();
  });
});

describe('checkIsSymbol', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsSymbol('badInput'); })
      .toThrowError('input is not a symbol.');

    // different variable name
    expect(() => { vs.checkIsSymbol('badInput', 'charles'); })
      .toThrowError('charles is not a symbol.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsSymbol(Symbol('testInput'))).toBeUndefined();
  });
});

describe('checkIsUndefined', () => {
  it('throws on bad input', () => {
    expect(() => { vs.checkIsUndefined('badInput'); })
      .toThrowError('input is not undefined.');

    // different variable name
    expect(() => { vs.checkIsUndefined('badInput', 'charles'); })
      .toThrowError('charles is not undefined.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsUndefined(undefined)).toBeUndefined();
  });
});

describe('checkIsZeroLength', () => {
  it('throws on bad input and constraint violation', () => {
    expect(() => { vs.checkIsZeroLength(12); })
      .toThrowError('input does not have a length property, or that property does not equal zero.');

    expect(() => { vs.checkIsZeroLength([1, 2, 3]); })
      .toThrowError('input does not have a length property, or that property does not equal zero.');

    // different variable name
    expect(() => { vs.checkIsZeroLength(12, 'charles'); })
      .toThrowError('charles does not have a length property, or that property does not equal zero.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsZeroLength('')).toBeUndefined();
    expect(vs.checkIsZeroLength([])).toBeUndefined();
  });
});

describe('checkObjectProperties', () => {
  it('returns true by default', () => {
    pending('implementation of reviver');
  });
});
