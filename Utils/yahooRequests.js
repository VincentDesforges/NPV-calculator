const axios = require('axios');
const $ = require('cheerio');

const getPastCashFlows = async (ticker) => {
  try {
    const response = await axios.get(`https://finance.yahoo.com/quote/${ticker}/financials?p=${ticker}`);
    if (!response) {
      throw new Error();
    }
    const incomeStatement = Object.values($('tr', response.data));

    const netIncomes = incomeStatement.filter((tableRow) => {
      if (tableRow.children && tableRow.children.length > 4 && tableRow.children[0].children[0].children[0].data === 'Net Income Applicable To Common Shares') {
        return true;
      }
      return false;
    })[0];

    const netIncomesArray = netIncomes.children.map(tDat => tDat.children[0].children[0].data);

    return netIncomesArray;
  } catch (e) {
    throw new Error(`Unable to retrieve ${ticker} from yahoo finance`);
  }
};

module.exports = { getPastCashFlows };
