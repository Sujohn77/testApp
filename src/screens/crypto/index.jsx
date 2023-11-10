import React, {useState, useEffect, useRef} from "react";
import {useQuery} from "react-query";
import tw from "twrnc";
import {
  fetchCryptoByDate,
  fetchCryptoPrices,
  fetchCryptoHistory,
} from "../../api/marketData";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
// import FullSizeChart from '../../components/chart/FullSizeChart';
import Header from "../../components/header";

import {cryptoList, currency, cryptoGraph} from "../../constants";

import cryptoImages from "../../assets/images/crypto";
import FullSizeChart from "../../components/chart/FullSizeChart";
import images from "../../assets/images";
import Menu from "../../components/menu";
import moment from "moment";
import stocksImages from "../../assets/images/stocks";

const cryptoGraphsNames = {
  BTC: "bitcoin",
  ETC: "etherium",
  SOL: "solana",
};
const cryptoIds = Object.keys(cryptoList);
const yesterday = moment().subtract(1, "days").format("DD-MM-YYYY");
const CryptoScreen = ({navigation}) => {
  const {data} = useQuery("fetchCryptoHistory", () =>
    fetchCryptoHistory({name: cryptoGraphsNames.BTC, duration: 30}),
  );

  const {data: cryptoData} = useQuery("fetchCryptoByDate", () =>
    Promise.all(cryptoIds.map(name => fetchCryptoByDate({name}))),
  );

  const {data: cryptoDayBefore, error} = useQuery("fetchCryptoByDate", () =>
    Promise.all(
      cryptoIds.map(name => fetchCryptoByDate({name, date: yesterday})),
    ),
  );

  if (!cryptoData || !cryptoDayBefore || !data) {
    return (
      <View style={tw`mt-8`}>
        <ActivityIndicator />
      </View>
    );
  }

  const graphData = data.prices?.slice(0, 30).map(item => item[1]);
  const formattedCryptoData = cryptoData
    .filter(item => !item.status)
    .map(item => {
      return {
        [item.id]: item.market_data?.current_price[currency],
      };
    });

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={tw`pb-5`}>
        <View style={tw`h-full`}>
          <Image source={images.cryptoBanner} style={tw`w-full h-[150px]`} />
          <View
            style={tw`relative px-3 -mt-3 py-5 bg-white min-h-[600px] rounded-2xl w-full`}>
            <Text style={tw`text-center text-[28px] font-semibold mb-3`}>
              Crypto tracker
            </Text>
            {graphData && (
              <FullSizeChart
                image={cryptoImages.bitcoin}
                title={cryptoList[cryptoGraphsNames.BTC]?.title}
                subTitle={cryptoList[cryptoGraphsNames.BTC]?.subTitle}
                small={true}
                data={graphData}
                symbol={cryptoGraph}
              />
            )}
            <Text style={tw`text-2xl text-black font-semibold mb-3`}>
              Cryptocurrency Prices
            </Text>
            {formattedCryptoData.map((item, index) => {
              const key = Object.keys(item)[0];

              const price =
                item[key] > 1 ? item[key]?.toFixed(2) : item[key]?.toFixed(4);
              const yesterdayPrice = cryptoDayBefore ? cryptoDayBefore[key] : 0;

              const percentageDiff = (price / yesterdayPrice - 1) * 100;
              const isGrowth = percentageDiff > 0;
              const percentageSign = isGrowth ? "+" : "";

              return (
                <View
                  style={tw`h-16 px-3 w-full flex flex-row gap-2 rounded-md`}
                  key={key}>
                  <Image
                    source={cryptoImages[key]}
                    style={tw`w-10 h-10 shrink-0`}
                  />
                  <View style={tw`flex-1`}>
                    <View style={tw`flex flex-row justify-between`}>
                      <Text style={tw`font-semibold text-sm`}>
                        {cryptoList[key]?.title}
                      </Text>
                      <Text style={tw`font-semibold text-sm `}>${price}</Text>
                    </View>
                    <View style={tw`flex flex-row justify-between gap-2`}>
                      <Text style={tw`text-slate-500 text-xs`}>
                        {cryptoList[key]?.subTitle}
                      </Text>
                      {cryptoDayBefore[key] && (
                        <Text
                          style={tw`${
                            isGrowth ? "text-lime-500" : "text-rose-300"
                          } text-xs`}>
                          {percentageSign}
                          {percentageDiff.toFixed(2)}%
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CryptoScreen;
