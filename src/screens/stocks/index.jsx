import React, {useState, useEffect, useRef} from "react";
import {useQueries, useQuery} from "react-query";
import tw from "twrnc";
import {fetchStockData} from "../../api/marketData";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Animated,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
// import FullSizeChart from '../../components/chart/FullSizeChart';

import images from "../../assets/images";
import {
  stockGraph,
  stocksIds,
  stocksImageText,
  stocksList,
  stocksPostText,
} from "../../constants";

import FullSizeChart from "../../components/chart/FullSizeChart";

import LinearGradient from "react-native-linear-gradient";
import {useRoute} from "@react-navigation/native";
import moment from "moment";
import stocksImages from "../../assets/images/stocks";
import Shadow from "../../components/shadow";
import {useTranslation} from "react-i18next";

const StocksScreen = ({navigation}) => {
  const {t} = useTranslation();
  const {data: graphData} = useQuery("fetchStockHistory", () =>
    fetchStockData({stock: stockGraph, duration: 30}),
  );

  const [stocksData, setStocksData] = useState([]);
  const [stocksDayBefore, setStocksDayBefore] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const data = await Promise.all(
        stocksIds.map(stock =>
          fetchStockData({
            stock: stock,
            duration: 1,
            startDate: moment().subtract(2, "days"),
          }),
        ),
      );
      const previousData = await Promise.all(
        stocksIds.map(stock =>
          fetchStockData({
            stock: stock,
            duration: 1,
            startDate: moment().subtract(3, "days"),
          }),
        ),
      );
      console.log(data);
      setStocksData(data.filter(item => item?.c));
      setStocksDayBefore(previousData.filter(item => item?.c));
    };
    fetchStocks();
  }, []);

  if (!graphData && !stocksData.length) {
    return (
      <View style={tw`mt-8`}>
        <ActivityIndicator />
      </View>
    );
  }
  const stocksPrices = stocksData
    .filter(stock => stock?.c[0])
    .map(stock => stock.c[0]);
  const stocksPricesDayBefore = stocksDayBefore
    .filter(stock => stock?.c[0])
    .map(stock => stock.c[0]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`h-full`}>
          <LinearGradient colors={["#9D57E3", "#0046CD"]} style={tw`py-4`}>
            <Text style={tw`text-center font-semibold text-3xl text-white`}>
              {t("stocks_title")}
            </Text>
          </LinearGradient>
          <View style={tw`mt-3 py-1 mx-5`}>
            <FullSizeChart
              title={stocksList[stockGraph].title}
              subTitle={stocksList[stockGraph].subTitle}
              data={graphData?.c || []}
              symbol={stockGraph}
            />
            <Text style={tw`text-2xl text-black font-semibold mb-3`}>
              {t("stocks_info_title")}
            </Text>
            <Shadow
              color={"rgb(67,5,202,0.7)"}
              onPress={() =>
                navigation.navigate("StocksPost", {
                  text: t("stocks_post_text"),
                  imageText: t("stocks_info_text"),
                  imageName: "textBanner",
                })
              }>
              <ImageBackground
                source={images.textBanner}
                style={{
                  height: 140,
                  paddingLeft: 15,
                  paddingTop: 15,
                  borderRadius: 15,
                  overflow: "hidden",
                }}>
                <Text style={tw`font-semibold text-white text-xl w-[50%]`}>
                  {t("stocks_info_text")}
                </Text>
              </ImageBackground>
            </Shadow>

            <Text style={tw`text-2xl text-black font-semibold my-2 mt-4`}>
              {t("stocks_subtitle")}
            </Text>
            {!!stocksData ? (
              stocksIds.map((key, index) => {
                const price = stocksPrices[index];
                const yesterdayPrice = stocksPricesDayBefore
                  ? stocksPricesDayBefore[index]
                  : 0;
                const percentageDiff = (price / yesterdayPrice - 1) * 100;
                const isGrowth = percentageDiff > 0;
                const percentageSign = isGrowth ? "+" : "";

                return (
                  <View
                    style={tw`h-16 p-3 w-full flex flex-row gap-2 mb-3 rounded-md bg-[#6070ff41]`}
                    key={`stock-${index}`}>
                    {!!stocksImages[key] && (
                      <Image
                        source={stocksImages[key]}
                        style={tw`w-10 h-10 shrink-0 rounded-full`}
                      />
                    )}
                    <View style={tw`flex-1`}>
                      <View style={tw`flex flex-row justify-between`}>
                        <Text style={tw`font-semibold text-sm`}>
                          {stocksList[key]?.title}
                        </Text>
                        <Text style={tw`font-semibold text-sm`}>
                          {!!stocksPrices[index] && `$${stocksPrices[index]}`}
                        </Text>
                      </View>
                      <View style={tw`flex flex-row justify-between gap-2`}>
                        <Text style={tw`text-slate-500 text-xs`}>
                          {stocksList[key]?.subTitle}
                        </Text>
                        {!!yesterdayPrice && (
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

export default StocksScreen;
