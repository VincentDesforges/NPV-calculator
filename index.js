require('./config/config');

const {cashNoGrowth,
  cashSteadyGrowth,
  cashAnalystGrowth} = require('./Utils/cashFlows'); // <-- syntax for import all ?

// console.log(cashNoGrowth(200));
console.log(cashSteadyGrowth(200, 12));
// console.log(cashAnalystGrowth(200, 10));


// Connect to yahoo finance and get historical cash flows data from company


// FOR NPV CALCS USE 20% DISCOUNT RATE AND A 10 YEAR HORIZON

// Compute the NPV according to cash flow remained constant
// Compute NPV according to slow growth for 10 years.
// Compute NPV according to analyst projected growth then levels off

// FOR TESTING
// axios call should return 200 if correct data is sent
// should not be empty when AAPL is passed in
// Should handle case where invalid ticker is sent

// Function for NPV should return Val for XX cash flow

// Function for cases:
// 0 growth:
    // should return cash flows for each of the 10 years
// steady growth:
    // should return cash flows for each of the 10 years
// analyst growth then levels off:
    // should return cash flows for each of the 10 years
