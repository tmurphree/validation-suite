/* eslint no-undef:"off" */

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
    expect(() => { vs.checkIsDate('badInput', 'charles'); }).toThrowError('charles is not a date.');
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
    expect(() => { vs.checkIsDate('badInput', 'charles'); }).toThrowError('charles is not a date.');
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
    expect(() => { vs.checkIsNull('badInput'); }).toThrowError('input is not null.');

    // different variable name
    expect(() => { vs.checkIsNull('badInput', 'charles'); }).toThrowError('charles is not null.');
  });

  it('returns undefined', () => {
    expect(vs.checkIsNull(null)).toBeUndefined();
  });
});
