import {cryptoList} from '../constants';

export type SymbolType = {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number; // Trade executed timestamp, as same as `T` in the stream
  isBuyerMaker: Boolean;
  isBestMatch: Boolean;
};

function replacer(key: string, value: string) {
  if (value === null) {
    return undefined;
  }
  return value;
}

export const fetchCryptoPrices = async (): Promise<Array<SymbolType>> => {
  const response = await fetch(
    `https://api.binance.com/api/v3/ticker/price?symbols=${JSON.stringify(
      cryptoList,
      replacer,
    )}`,
  );
  return response.json() as any;
};
