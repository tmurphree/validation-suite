/* eslint no-undef:"off" */

/**
 * @fileoverview Test functions in the vs.not namespace.
*/

require('dotenv').config();

const vsNot = require('../index.js').not;

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

describe('checkIsNotNullOrUndefined', () => {
  it('throws on bad input', () => {
    expect(() => { vsNot.checkIsNotNullOrUndefined(null); }).toThrowError('input is null.');
    expect(() => { vsNot.checkIsNotNullOrUndefined(undefined); }).toThrowError('input is undefined.');

    // different variable name
    expect(() => { vsNot.checkIsNotNullOrUndefined(null, 'charles'); }).toThrowError('charles is null.');
    expect(() => { vsNot.checkIsNotNullOrUndefined(undefined, 'charles'); }).toThrowError('charles is undefined.');
  });

  it('returns undefined', () => {
    expect(vsNot.checkIsNotNullOrUndefined([])).toBeUndefined();
    expect(vsNot.checkIsNotNullOrUndefined(99)).toBeUndefined();
  });
});
