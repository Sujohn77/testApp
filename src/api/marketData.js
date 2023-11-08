import {Alert} from 'react-native';
import {
  cryptoList,
  currency,
  stockGraph,
  stocksIds,
  stocksList,
} from '../constants';
import moment from 'moment';

// export type SymbolType = {
//   id: number,
//   price: string,
//   qty: string,
//   quoteQty: string,
//   time: number, // Trade executed timestamp, as same as `T` in the stream
//   isBuyerMaker: Boolean,
//   isBestMatch: Boolean,
// };

// function replacer(key: string, value: string) {
//   if (value === null) {s
//     return undefined;
//   }
//   return value;
// }
const durationPeriod = 100;
const token = 'eVV2QnVyUGtyZ3p6cGpINTVyUHdjUjNrLUpxREZXVmI0VWpOMFktdDRMWT0';
export const fetchStockHistory = async ({stock}) => {
  const headers = {};
  if (token) {
    headers[
      'Authorization'
    ] = `Token eVV2QnVyUGtyZ3p6cGpINTVyUHdjUjNrLUpxREZXVmI0VWpOMFktdDRMWT0`;
  }

  const today = moment().format('YYYY-MM-DD');
  const pastNDays = moment().subtract(100, 'days').format('YYYY-MM-DD');

  const response = await fetch(
    'https://api.marketdata.app/v1/stocks/candles/D/NFLX?from=2020-01-01&to=2020-12-31&',
    {
      method: 'GET',
      headers: {
        Accept: '*/*',
        Authorization:
          'Token eVV2QnVyUGtyZ3p6cGpINTVyUHdjUjNrLUpxREZXVmI0VWpOMFktdDRMWT0',
      },
    },
  );
  console.log(response);

  return response.json();
};

export const fetchStockData = async () => {
  const stocksData = {};

  if (stocksIds.length) {
    for (let index = 0; index < stocksIds.length - 1; index++) {
      const stock = stocksIds[index];

      const response = await fetch(
        `https://api.marketdata.app/v1/stocks/candles/daily/AAPL?to=today&countback=1`,
        // {
        //   headers: {
        //     Authorization: `Token eVV2QnVyUGtyZ3p6cGpINTVyUHdjUjNrLUpxREZXVmI0VWpOMFktdDRMWT0`,
        //   },
        // },
      );
      const data = await response.json();

      if (stockData) {
        stocksData = {...stockData, [stock]: data.o[0]};
      }
    }

    return stocksData;
  }
  return {};
};

export const fetchCryptoPrices = async () => {
  const cryptoIds = Object.keys(cryptoList).join(',');
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd`,
  );
  const data = await response.json();

  return data;
};

export const fetchCryptoByDate = async ({
  date = moment().subtract(1, 'days').format('DD-MM-YYYY'), // Yesterday date
}) => {
  let coinData = {};
  console.log(true);
  const cryptoIds = Object.keys(cryptoList);

  try {
    for (let index = 0; index < cryptoIds.length; index++) {
      const coin = cryptoIds[index];
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date}`,
      );
      const data = await response.json();
      if (data) {
        coinData = {
          ...coinData,
          [coin]: data.market_data.current_price[currency] || {},
        };
      }
    }
  } catch (error) {
    console.log(error);
  }

  return coinData;
};
