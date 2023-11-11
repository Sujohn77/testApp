import {Alert} from "react-native";
import {
  cryptoList,
  currency,
  stockGraph,
  stocksIds,
  stocksList,
} from "../constants";
import moment from "moment";
import axios from "axios";

const durationPeriod = 100;
const token = "eVV2QnVyUGtyZ3p6cGpINTVyUHdjUjNrLUpxREZXVmI0VWpOMFktdDRMWT0";

export const axiosInstance = axios.create({
  baseURL: "https://api.marketdata.app/v1",
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Token eVV2QnVyUGtyZ3p6cGpINTVyUHdjUjNrLUpxREZXVmI0VWpOMFktdDRMWT0",
  },
});

export const fetchStockData = async ({stock, duration, startDate}) => {
  try {
    const today = startDate
      ? startDate.format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    const pastNDays = moment(today)
      .subtract(duration, "days")
      .format("YYYY-MM-DD");

    const response = await axios.get(
      `https://api.marketdata.app/v1/stocks/candles/D/${stock}?from=${pastNDays}&to=${today}&token=${token}`,
    );

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
  const response = await fetch(process.env.QUIZ_CONTENT_URL);

  return response.json();
};

const today = moment().format("DD-MM-YYYY");
export const fetchCryptoByDate = async ({name, date = today}) => {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${name}/history?date=${date}?x_cg_pro_api_key=ecaf5b3d-b1c8-4141-8778-289f93f28787`;
    const response = await axios.get(url);

    return response.data;
    // if (!data?.market_data) return null;
    // return {[name]: data.market_data?.current_price[currency]};
  } catch (error) {
    console.log(error);
  }
};
