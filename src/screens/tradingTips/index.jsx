import React, {useState, useEffect, useRef, useMemo} from "react";
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
import axios from "axios";
import Menu from "../../components/menu";
import LinearGradient from "react-native-linear-gradient";
import {useRoute} from "@react-navigation/native";
import moment from "moment";
import stocksImages from "../../assets/images/stocks";
import Shadow from "../../components/shadow";
import {data} from "./mock";

const tradingTipsImages = [
  images.tradingTips1,
  images.tradingTips2,
  images.tradingTips3,
];

const TradingTipsScreen = ({navigation}) => {
  const navigate = ({subtitle, description}) => {
    navigation.navigate("TradingTipsPost", {
      imageName: "tradingTips1",
      title: subtitle,
      text: description,
    });
  };

  const renderPostRow = ({item, index, image}) => {
    return (
      <View
        key={index}
        onTouchEnd={() => navigate(item)}
        style={tw`flex flex-row mb-3 items-center gap-6 w-full bg-sky-200 border-l-[#BD00DD] border-l-2 rounded-lg px-3 py-3`}>
        <Text style={tw`text-lg text-black w-[70%]`}>{item.title}</Text>
        <Image style={tw`w-[60px] h-[60px]`} source={image} />
      </View>
    );
  };

  const newestTips = data
    .filter(item => moment().isSame(item.date, "day"))
    .map((item, index) =>
      renderPostRow({item, index, image: tradingTipsImages[1]}),
    );

  const otherTips = data
    .filter(item => !moment().isSame(item.date, "day"))
    .map((item, index) =>
      renderPostRow({item, index, image: tradingTipsImages[1]}),
    );
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`h-full`}>
          <LinearGradient colors={["#9D57E3", "#0046CD"]} style={tw`py-4 `}>
            <Text style={tw`text-center font-semibold text-3xl text-white`}>
              Trading Tips
            </Text>
          </LinearGradient>
          <ImageBackground
            source={images.tradingTipsBg}
            style={tw`w-full h-[160px] flex items-center justify-center mb-5`}>
            <Text
              style={tw`uppercase font-bold text-[28px] text-white w-[85%] text-center`}>
              Tips that will make you a successful trader
            </Text>
          </ImageBackground>
          <View style={tw`px-3 flex flex-col gap-3`}>
            <View>
              <Text style={tw`text-lg text-black`}>Newest</Text>
              <View style={tw`mt-3`}>{newestTips}</View>
            </View>
            <View>
              <Text style={tw`text-lg text-black`}>Oldest</Text>
              <View style={tw`mt-3`}>{otherTips}</View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TradingTipsScreen;
