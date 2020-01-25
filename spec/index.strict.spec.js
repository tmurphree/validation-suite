/* eslint no-undef:"off" */

/**
 * @fileoverview Test functions in the vs.strict namespace.  Does not duplicate tests
 * from index.spec.js or test functions with no options impacted by strict mode.
*/

require('dotenv').config();

const vsStrict = require('../index.js').strict;

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

describe('vsStrict.checkIsObjectLike', () => {
  const template = { a: 1, b: 2, c: 3 };

  it('checks types in strict mode', () => {
    const bIsString = { a: 1, b: 's', c: 3 };

    const hyphen1 = { 'user-id': 1 };
    const hyphenTemplate = { 'user-id': 'string' };

    expect(() => (vsStrict.checkIsObjectLike(bIsString, template)))
      .toThrowError('input.b is type string and expected type number.');

    expect(() => (vsStrict.checkIsObjectLike(hyphen1, hyphenTemplate)))
      .toThrowError('input.user-id is type number and expected type string.');
  });

  it('lets you change the variable name in the output', () => {
    const bIsString = { a: 1, b: 's', c: 3 };

    expect(() => (vsStrict.checkIsObjectLike('notanobject', template, 'charles')))
      .toThrowError('charles is not an object.');

    // x is missing property b
    expect(() => (vsStrict.checkIsObjectLike({ a: 1, c: 3 }, template, 'charles')))
      .toThrowError('charles is missing at least property b.');

    // x has all of template plus property d
    expect(() => (vsStrict.checkIsObjectLike({ a: 1, b: 2, c: 3, d: 4 }, template, 'charles')))
      .toThrowError('charles has at least one additional property d.');

    expect(() => (vsStrict.checkIsObjectLike(bIsString, template, 'charles')))
      .toThrowError('charles.b is type string and expected type number.');
  });
});
