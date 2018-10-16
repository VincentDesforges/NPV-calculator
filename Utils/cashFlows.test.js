const expect = require('expect');
process.env.NODE_ENV = 'test';
require('../config/config');

const {cashNoGrowth,
  cashSteadyGrowth,
  cashAnalystGrowth} = require('./cashFlows');


describe('cashNoGrowth:', () => {
  it('should generate cash flow data of the correct length', () => {
    const testCash = cashNoGrowth(200);
    const keys = Object.keys(testCash);
    expect(keys.length).toBe(parseInt(process.env.TIME_HORIZON) + 1)
  });

  it('should calcultate the correct cash and NPV values at 5 years', () => {
    const testCash = cashNoGrowth(200);
    expect(testCash["5"].amount).toBe(200);

    const approxVal = Math.round(testCash["5"].presentValue * 100) / 100;
    expect(approxVal).toBe(124.18);
  });
});


describe('cashSteadyGrowth:', () => {
  it('should generate cash flow data of the correct length', () => {
    const testCash = cashSteadyGrowth(200, 12);
    const keys = Object.keys(testCash);
    expect(keys.length).toBe(parseInt(process.env.TIME_HORIZON) + 1)
  });

  it('should calcultate the correct cash and NPV values at 10 years', () => {
    const testCash = cashSteadyGrowth(200, 12);

    const approxAmount = Math.round(testCash["10"].amount * 100) / 100;
    expect(approxAmount).toBe(621.17);

    const approxPresentVal = Math.round(testCash["10"].presentValue * 100) / 100;
    expect(approxPresentVal).toBe(239.49);
  });
});


describe('cashAnalystGrowth:', () => {
  it('should generate cash flow data of the correct length', () => {
    const testCash = cashAnalystGrowth(200, 12);
    const keys = Object.keys(testCash);
    expect(keys.length).toBe(parseInt(process.env.TIME_HORIZON) + 1)
  });

  it('should calcultate the correct cash and NPV values at 5 years', () => {
    const testCash = cashAnalystGrowth(200, 12);

    const approxAmount = Math.round(testCash["5"].amount * 100) / 100;
    expect(approxAmount).toBe(352.47);

    const approxPresentVal = Math.round(testCash["5"].presentValue * 100) / 100;
    expect(approxPresentVal).toBe(218.86);
  });

  it('should calcultate the correct cash and NPV values at 10 years', () => {
    const testCash = cashAnalystGrowth(200, 12);

    const approxAmount = Math.round(testCash["10"].amount * 100) / 100;
    expect(approxAmount).toBe(352.47);

    const approxPresentVal = Math.round(testCash["10"].presentValue * 100) / 100;
    expect(approxPresentVal).toBe(135.89);
  });
});
