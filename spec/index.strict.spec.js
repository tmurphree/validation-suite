/* eslint no-undef:"off" */

/**
 * @fileoverview Test functions in the vs.strict namespace.  Does not duplicate tests
 * from index.spec.js or functions with no options.
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

xdescribe('isObjectLike', () => {
  it('throws on bad input', () => {
    expect(() => { vsStrict.isObjectLike(null); }).toThrowError('input is null.');
    expect(() => { vsStrict.isObjectLike(undefined); }).toThrowError('input is undefined.');

    // different variable name
    expect(() => { vsStrict.isObjectLike(null, 'charles'); }).toThrowError('charles is null.');
    expect(() => { vsStrict.isObjectLike(undefined, 'charles'); }).toThrowError('charles is undefined.');
  });

  it('returns undefined', () => {
    expect(vsStrict.isObjectLike([])).toBeUndefined();
    expect(vsStrict.isObjectLike(99)).toBeUndefined();
  });
});
