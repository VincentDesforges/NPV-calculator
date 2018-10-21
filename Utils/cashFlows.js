// functions for the cash flow computations:

// calculates the NPV of a cash payment of amount->cash yearsForward in the future
const calcNPVs = (cash, yrsFwd) => cash / ((1 + process.env.DISCOUNT_RATE / 100) ** yrsFwd);

// populates an object with the values and their corresponding NPVs for the next few years
const generateCashFlows = (passedFunction, intialCashFlow, growthFactor) => {
  const output = {};
  output[0] = { amount: intialCashFlow, presentValue: 0 };
  for (let i = 1; i <= process.env.TIME_HORIZON; i++) {
    const cash = passedFunction(i, output, growthFactor);
    output[i] = {
      amount: cash,
      presentValue: calcNPVs(cash, i),
    };
  }
  return output;
};

// Sums up the NPVs for each yearly payment
const totalNPV = (cashFlowObj) => {
  let NPV = 0;
  Object.keys(cashFlowObj).forEach((key) => {
    NPV += cashFlowObj[key].presentValue;
  });
  return Math.round(NPV * 100) / 100;
};

// generates the case for the cash flows growing steadily for the next few years
const cashSteadyGrowth = (intialCashFlow, growth) => {
  const growthFactor = 1 + growth / 100;
  const cashCalc = (rank, input, gFactor) => input[rank - 1].amount * gFactor;
  return generateCashFlows(cashCalc, intialCashFlow, growthFactor);
};

// generates the case for current cash flow being maintained for the next few years
const cashNoGrowth = intialCashFlow => cashSteadyGrowth(intialCashFlow, 0);

// generates the case for growth for 5 years and stagnation for the rest
const cashAnalystGrowth = (intialCashFlow, growth) => {
  const growthFactor = 1 + growth / 100;
  const cashCalc = (rank, input, gFactor) => {
    let useFactor;
    if (rank < 6) {
      useFactor = gFactor;
    } else {
      useFactor = 1;
    }
    return input[rank - 1].amount * useFactor;
  };
  return generateCashFlows(cashCalc, intialCashFlow, growthFactor);
};

module.exports = {
  cashNoGrowth,
  cashSteadyGrowth,
  cashAnalystGrowth,
  totalNPV,
};


// No growth
// WACC: weighted average cost of capital

// Firm value = Operating free cash flows / (1 + WACC)


// Constant growth
// Firm value = OFCF / (k - g)
// k: discount rate (WACC)
// g: expected growth in OFCF
