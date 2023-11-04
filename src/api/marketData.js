import {Alert} from 'react-native';
import {cryptoList, currency, stockGraph, stocksList} from '../constants';
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

export const fetchStockPrices = async ({stock = 'AAPL'}) => {
  const response = await fetch(
    `https://api.marketdata.app/v1/stocks/candles/daily/${stock}?to=today&countback=100`,
  );

  return response.json();
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
  const a = Object.keys(coinData).length;

  return coinData;
};
