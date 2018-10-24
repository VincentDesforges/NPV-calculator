require('./config/config');

const {
  getCashFlowPerShare,
} = require('./Utils/yahooRequests');

const {
  cashNoGrowth,
  cashSteadyGrowth,
  cashAnalystGrowth,
  totalNPV,
} = require('./Utils/cashFlows');

const {
  cashFlowStats
} = require('./Utils/pastCashStats');

// Order:
// Get past cash flows per share
// Then extract stats -> average cashflow and average growth rate
// Perform the analysis for the three scenarios
// Sum up to get value for each
// Print neatly: <-- store in separate function?

// Still to write tests!!!

// console.log(cashNoGrowth(200));
// console.log(cashSteadyGrowth(200, 5));
// console.log(cashAnalystGrowth(200, 5));

// console.log('No growth:', totalNPV(cashNoGrowth(200)));
// console.log('Analyst growth:', totalNPV(cashAnalystGrowth(200, 5)));
// console.log('Steady growth:', totalNPV(cashSteadyGrowth(200, 5)));

// getPastCashFlows('GE').then((jsonResponse) => {
//   console.log(jsonResponse);
// }).catch((e) => {
//   console.log(e);
// });

// getNumOfOutstandingShares('GE').then((jsonResponse) => {
//   console.log(jsonResponse);
// }).catch((e) => {
//   console.log(e);
// });

getCashFlowPerShare('AAPL').then((jsonResponse) => {
  const cashStats = cashFlowStats(jsonResponse);
  console.log(jsonResponse);
  console.log(cashStats);
}).catch((e) => {
  console.log(e);
});
