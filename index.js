require('./config/config');

const {cashNoGrowth,
  cashSteadyGrowth,
  cashAnalystGrowth, totalNPV} = require('./Utils/cashFlows');

// console.log(cashNoGrowth(200));
// console.log(cashSteadyGrowth(200, 5));
// console.log(cashAnalystGrowth(200, 5));

console.log('No growth:', totalNPV(cashNoGrowth(200)));
console.log('Analyst growth:', totalNPV(cashAnalystGrowth(200, 5)));
console.log('Steady growth:', totalNPV(cashSteadyGrowth(200, 5)));





// Connect to yahoo finance and get historical cash flows data from company

// FOR TESTING
// axios call should return 200 if correct data is sent
// should not be empty when AAPL is passed in
// Should handle case where invalid ticker is sent
