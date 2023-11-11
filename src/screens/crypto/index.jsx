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
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
// import FullSizeChart from '../../components/chart/FullSizeChart';
import Header from "../../components/header";

import {top25Cryptos, cryptoGraph, cryptoList} from "../../constants";

import cryptoImages from "../../assets/images/crypto";
import FullSizeChart from "../../components/chart/FullSizeChart";
import images from "../../assets/images";

import moment from "moment";

import {selectCryptoPrices} from "../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cryptoGraphsNames = {
  BTC: "bitcoin",
  ETC: "etherium",
  SOL: "solana",
};
const cryptoIds = Object.keys(top25Cryptos);
const yesterday = moment().subtract(1, "days").format("DD-MM-YYYY");
const graphDuration = 30;

const CryptoScreen = ({navigation}) => {
  const {data} = useQuery("fetchCryptoHistory", () =>
    fetchCryptoHistory({name: cryptoGraphsNames.BTC, duration: graphDuration}),
  );
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [oldCryptoPrices, setOldCryptoPrices] = useState({});

  useEffect(() => {
    const getCachedPrices = async () => {
      const prices = await AsyncStorage.getItem("cryptoPrices");
      if (!JSON.parse(prices)) {
        !cryptoPrices && setCryptoPrices(prices);
      }
    };

    const getCryptoPrices = async () => {
      const cryptoPrices = await Promise.all(
        cryptoIds.map(name => fetchCryptoByDate({name})),
      );
      const oldDate = moment().subtract(1, "days").format("DD-MM-YYYY");
      const cryptoPricesDurationAgo = await Promise.all(
        cryptoIds.map(name => fetchCryptoByDate({name, date: oldDate})),
      );

      const updatedNewPrices = selectCryptoPrices(cryptoPrices);
      const updatedOldPrices = selectCryptoPrices(cryptoPricesDurationAgo);
      if (!Object.keys(cryptoPrices).length) {
        getCachedPrices();
        return;
      }

      setCryptoPrices(updatedNewPrices);
      setOldCryptoPrices(updatedOldPrices);

      AsyncStorage.setItem("cryptoPrices", JSON.stringify(updatedNewPrices));
    };

    getCryptoPrices();
  }, []);

  if (!cryptoPrices || !data) {
    return (
      <View style={tw`mt-8`}>
        <ActivityIndicator />
      </View>
    );
  }

  const graphData = data.prices?.slice(0, 30).map(item => item[1]);
  const graphDiffValue = (graphData[graphData.length - 1] - graphData[0]) / 100;
  const isLoadedPrices =
    !!Object.keys(oldCryptoPrices).length && !!Object.keys(cryptoPrices).length;
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
                graphDiffValue={graphDiffValue.toFixed(2)}
              />
            )}
            <Text style={tw`text-2xl text-black font-semibold mb-3`}>
              Cryptocurrency Prices
            </Text>
            {isLoadedPrices ? (
              Object.keys(cryptoPrices).map((key, index) => {
                const item = cryptoPrices[key];
                const price =
                  item.price > 1
                    ? item.price?.toFixed(2)
                    : item.price?.toFixed(4);
                const yesterdayPrice = oldCryptoPrices[key].price;
                const percentageDiff = (item.price / yesterdayPrice - 1) * 100;
                const isGrowth = percentageDiff > 0;
                const percentageSign = isGrowth ? "+" : "";

                return (
                  <View
                    style={tw`h-16 px-3 w-full flex flex-row gap-2`}
                    key={`crypto-price-${index}`}>
                    <Image
                      source={{uri: item.image}}
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
                        {yesterdayPrice ? (
                          <Text
                            style={tw`${
                              isGrowth ? "text-lime-500" : "text-rose-300"
                            } text-xs`}>
                            {percentageSign}
                            {percentageDiff?.toFixed(2)}%
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CryptoScreen;
