const axios = require('axios');
const $ = require('cheerio');

// Get cash flows for the past few years in chronological order (number in thousands)
const getPastCashFlows = async (ticker) => {
  try {
    const response = await axios.get(`https://finance.yahoo.com/quote/${ticker}/financials?p=${ticker}`);
    if (!response) {
      throw new Error();
    }

    const netIncomes = $('span:contains("Net Income Applicable To Common Shares")', response.data)[0].parent.parent;
    const netIncomesArray = netIncomes.children.map(tDat => tDat.children[0].children[0].data);

    netIncomesArray.splice(0, 1);
    const netIncomesArrayOut = netIncomesArray.map(stringNum => parseFloat(stringNum.replace(/,/g, ''), 10));

    return netIncomesArrayOut.reverse();
  } catch (e) {
    throw new Error(`Unable to retrieve ${ticker} from yahoo finance`);
  }
};

// Get the number of shares outstanding (in thousands)
const getShareNumAndAnalystGrowth = async (ticker) => {
  try {
    const response = await axios.get(`https://finance.yahoo.com/quote/${ticker}/key-statistics?p=${ticker}`);
    if (!response) {
      throw new Error();
    }

    const sharesOutstanding = $('span:contains("Shares Outstanding")', response.data)[0].parent.next.children[0].data;
    let sharesOutstandingInThousands = parseFloat(sharesOutstanding, 10);

    switch (sharesOutstanding[sharesOutstanding.length - 1]) {
      case 'B':
        sharesOutstandingInThousands *= 10 ** 6;
        break;
      case 'M':
        sharesOutstandingInThousands *= 10 ** 3;
        break;
      default:
        console.log('Last letter of shares outstanding field:', sharesOutstanding[sharesOutstanding.length - 1]);
        throw new Error();
    }

    const forwardPE = $('span:contains("Forward P/E")', response.data)[0].parent.next.children[0].data;
    const PEG = $('span:contains("PEG Ratio (5 yr expected)")', response.data)[0].parent.next.children[0].data;

    return {
      sharesOutstanding: sharesOutstandingInThousands,
      analystGrowth: forwardPE / PEG,
    };
  } catch (e) {
    throw new Error(`Unable to find the number of outstanding shares for ${ticker}`);
  }
};

// Get the cash flow per share for the past few years (in $/EUR/GBP or relevant currency per share)
const getCashFlowPerShare = async (ticker) => {
  try {
    const [totalCashFlow, sharesAndGrowth] = await Promise.all([
      getPastCashFlows(ticker),
      getShareNumAndAnalystGrowth(ticker),
    ]);

    console.log('Analyst Growth:', sharesAndGrowth.analystGrowth, '<=== pass through');

    return totalCashFlow.map(cash => cash / sharesAndGrowth.sharesOutstanding);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getShareNumAndAnalystGrowth,
  getPastCashFlows,
  getCashFlowPerShare,
};
