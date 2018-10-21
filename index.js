require('./config/config');

const { getPastCashFlows } = require('./Utils/yahooRequests');

const {
  cashNoGrowth,
  cashSteadyGrowth,
  cashAnalystGrowth,
  totalNPV,
} = require('./Utils/cashFlows');

// console.log(cashNoGrowth(200));
// console.log(cashSteadyGrowth(200, 5));
// console.log(cashAnalystGrowth(200, 5));

console.log('No growth:', totalNPV(cashNoGrowth(200)));
console.log('Analyst growth:', totalNPV(cashAnalystGrowth(200, 5)));
console.log('Steady growth:', totalNPV(cashSteadyGrowth(200, 5)));

getPastCashFlows('GE').then((jsonResponse) => {
  // console.log(JSON.stringify(jsonResponse, undefined, 2));
  console.log(jsonResponse);
  // console.log('finished');
}).catch((e) => {
  console.log(e);
});

// Connect to yahoo finance and get historical cash flows data from company

// FOR TESTING
// axios call should return 200 if correct data is sent
// should not be empty when AAPL is passed in
// Should handle case where invalid ticker is sent

// How is the initial cash flow value calculated?
// - average for past few years?
// - should some computation for the variance of the past earnings be used?
// - fit a curve? (to get growth rate)
// - Use of outlier remove to deminish the influence of large one off events?
