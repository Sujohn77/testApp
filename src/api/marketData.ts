import {Alert} from 'react-native';
import {stockGraph, stocksList} from '../constants';

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

export const fetchCryptoPrices = async () => {
  const prices = [];

  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=C0NJN8SJDJ8FL1MZ&symbol=AAPL&interval=60m`,
  );
  // const data = await response.json();
  // console.log(data);

  return response.json();
};
