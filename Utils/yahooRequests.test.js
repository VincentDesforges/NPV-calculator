// FOR TESTING
// axios call should return 200 if correct data is sent
// should not be empty when AAPL is passed in
// Should handle case where invalid ticker is sent

const expect = require('expect');

const {
  getPastCashFlows,
  getNumOfOutstandingShares,
} = require('../Utils/yahooRequests');

describe('getPastCashFlows', () => {
  it('should retrieve the appropriate data for AAPL', (done) => {
    const ticker = 'AAPL';
    // Is this the right way to test async methods??!!!
    getPastCashFlows(ticker).then((jsonResponse) => {
      done('Error not coded yet');
      console.log(jsonResponse);
    }).catch((e) => {
      console.log(e);
      done(e);
    });
  });

  it('should raise and error for invalid ticker', (done) => {
    done('Error not coded yet');
  });
});

// getNumOfOutstandingShares('GE').then((jsonResponse) => {
//   console.log(jsonResponse);
// }).catch((e) => {
//   console.log(e);
// });
