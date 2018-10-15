// functions for the cash flow computations:

// calculates the NPV of a cash payment of amount->cash yearsForward in the future
const calcNPV = (cash, yearsForward) => cash / 1.1 ** yearsForward;

const generateCashFlows = (passedFunction, intialCashFlow, growthFactor) => {
  const output = {};
  output[0] = {amount: intialCashFlow, presentValue: 0};

  for (i = 1; i <= 10; i++) {
    const cash = passedFunction(output, growthFactor);
    output[i] = {
      amount: cash,
      presentValue: calcNPV(cash, i)
    };
  }
  return output;
};

const cashNoGrowth = (intialCashFlow) => {
  return cashSteadyGrowth(intialCashFlow, 0);
};

const cashSteadyGrowth = (intialCashFlow, growth) => {
  const growthFactor = 1 + growth / 100;
  const cashCalc = (input, growthFactor) => input[i - 1].amount * growthFactor;
  return generateCashFlows(cashCalc, intialCashFlow, growthFactor);
};

const cashAnalystGrowth = (intialCashFlow, growth) => {
  const growthFactor = 1 + growth / 100;
  const cashCalc = (input, growthFactor) => {
    if (i < 6) {
      return input[i - 1].amount * growthFactor;
    } else {
      return input[i - 1].amount;
    }
  };
  const cashFlows = generateCashFlows(cashCalc, intialCashFlow, growthFactor);
  return cashFlows;
};

module.exports = {cashNoGrowth, cashSteadyGrowth, cashAnalystGrowth};


// No growth
// WACC: weighted average cost of capital

// Firm value = Operating free cash flows / (1 + WACC)


//Constant growth
//Firm value = OFCF / (k - g)
// k: discount rate (WACC)
// g: expected growth in OFCF