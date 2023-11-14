import {Alert} from "react-native";
import {
  cryptoList,
  currency,
  dateFormat,
  stockGraph,
  stocksIds,
  stocksList,
} from "../constants";
import moment from "moment";
import axios from "axios";
import {CRYPTO_TOKEN, STOCKS_TOKEN, QUIZ_CONTENT_URL} from "@env";

const token = STOCKS_TOKEN;

export const fetchStockData = async ({stock, duration = 2, startDate}) => {
  try {
    const today = startDate
      ? startDate.format(dateFormat)
      : moment().subtract(1, "days").format(dateFormat);
    const pastNDays = moment(today)
      .subtract(duration, "days")
      .format(dateFormat);
    const url = `https://api.marketdata.app/v1/stocks/candles/D/${stock}?from=${pastNDays}&to=${today}&token=${token}`;

    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCryptoHistory = async ({
  name,
  duration = 30,
  currency = "usd",
}) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=${currency}&days=${duration}&precision=0`,
    );

    return response.json();
  } catch (err) {}
};

export const fetchCryptoPrices = async ({ids}) => {
  const cryptoIds = ids.join(",");
  const response = await fetch(
    `https://api.coincap.io/v2/assets?ids=${cryptoIds}`,
  );

  return response.json();
};

export const fetchQuizWelcome = async () => {
  const response = await fetch(QUIZ_CONTENT_URL);

  return response.json();
};

const today = moment().format("DD-MM-YYYY");
export const fetchCryptoByDate = async ({name, date = today}) => {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${name}/history?date=${date}?x_cg_pro_api_key=${CRYPTO_TOKEN}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
// const cryptoIds = Object.keys(cryptoList);
// export const fetchCrypto = async ({name, date = today}) => {
//   const url = `https://api.coingecko.com/api/v3/coins/${name}/history?date=${date}?x_cg_pro_api_key=${CRYPTO_TOKEN}`;

//   const response = await axios.get(url);

//   return response.data;
// };
// const delay = 3000;
// const maxRetries = 2;
// export const retryRequest = async ({ids = cryptoIds, date}) => {
//   let retries = 0;

//   while (retries < maxRetries) {
//     try {
//       const result = await Promise.all(
//         ids.map(name => fetchCrypto({name, date})),
//       );
//       if (result !== null && result != undefined) {
//         return result;
//       }
//     } catch (error) {
//       // Request failed, wait and retry
//       console.log(
//         `Retry ${retries + 1}/${maxRetries}. Waiting for ${
//           delay * 2 ** retries
//         } milliseconds.`,
//       );
//       await new Promise(resolve => setTimeout(resolve, delay * 2 ** retries));
//       retries++;
//     }
//   }
//   return [];
// };
