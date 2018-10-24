// How is the initial cash flow value calculated?
// - average for past few years?
// - should some computation for the variance of the past earnings be used?
// - fit a curve? (to get growth rate)
// - Use of outlier remove to deminish the influence of large one off events?

const cashFlowStats = (pastCashFlows) => {
  const statSummary = {};

  // Average Cash Flow:
  const sumUp = (acc, curr) => acc + curr;
  statSummary.averageCashFlow = pastCashFlows.reduce(sumUp) / pastCashFlows.length;

  // Average Growth Rate:
  const tempArray = pastCashFlows.slice(0, pastCashFlows.length - 1);
  const growthRates = tempArray.map((cToday, i) => (pastCashFlows[i + 1] - cToday) * 100 / cToday);
  statSummary.averageGrowthRate = growthRates.reduce(sumUp) / growthRates.length;

  return statSummary;
};

module.exports = { cashFlowStats };
