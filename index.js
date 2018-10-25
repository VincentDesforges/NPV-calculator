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
  cashFlowStats,
} = require('./Utils/pastCashStats');

// Order:
// Get analyst growth <-- pass this is a smart way through
// Print neatly: <-- store in separate function?

// Still to write tests!!!

getCashFlowPerShare('AAPL').then((cashData) => {
  const cashStats = cashFlowStats(cashData);
  return cashStats;
}).then((data) => {
  console.log('Starting Cash Flow per share:', Math.round(data.averageCashFlow * 100) / 100);
  console.log('Starting Growth Rate per share:', Math.round(data.averageGrowthRate * 100) / 100);
  console.log('No growth:', totalNPV(cashNoGrowth(data.averageCashFlow)));
  console.log('Steady growth:', totalNPV(cashSteadyGrowth(data.averageCashFlow, data.averageGrowthRate)));
  console.log('Analyst growth:', totalNPV(cashAnalystGrowth(data.averageCashFlow, data.averageGrowthRate)));
}).catch((e) => {
  console.log(e);
});
