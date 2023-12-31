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
import {useTranslation} from "react-i18next";
import {getNewsKeys} from "../../utils";

const tradingTipsImages = [
  images.tradingTips1,
  images.tradingTips2,
  images.tradingTips3,
];

const TradingTipsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const navigate = ({subtitle, description}) => {
    navigation.navigate("TradingTipsPost", {
      imageName: "tradingTips1",
      title: subtitle,
      text: description,
    });
  };

  const renderPostRow = ({title, subtitle, description, index, image}) => {
    return (
      <View
        key={index}
        onTouchEnd={() => navigate({subtitle, description})}
        style={tw`flex flex-row mb-3 items-center gap-6 w-full bg-sky-200 border-l-[#BD00DD] border-l-2 rounded-lg px-3 py-3`}>
        <Text style={tw`text-lg text-black w-[70%]`}>{title}</Text>
        <Image style={tw`w-[60px] h-[60px]`} source={image} />
      </View>
    );
  };
  const newsKeys = getNewsKeys();
  const newestTips = data
    .filter((item, index) => newsKeys.includes(index + 1))
    .map((item, index) =>
      renderPostRow({
        title: t(`tip_title${index + 1}`),
        subtitle: t(`tip_subtitle${index + 1}`),
        description: t(`tip_description${index + 1}`),
        index: `newest-${index}`,
        image: tradingTipsImages[1],
      }),
    );

  const otherTips = data
    .filter((item, index) => !newsKeys.includes(index + 1))
    .map((item, index) =>
      renderPostRow({
        title: t(`tip_title${index + 1}`),
        subtitle: t(`tip_subtitle${index + 1}`),
        description: t(`tip_description${index + 1}`),
        index: `other-${index}`,
        image: tradingTipsImages[1],
      }),
    );
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`h-full`}>
          <LinearGradient colors={["#9D57E3", "#0046CD"]} style={tw`py-4 `}>
            <Text style={tw`text-center font-semibold text-3xl text-white`}>
              {t("tips_title")}
            </Text>
          </LinearGradient>
          <ImageBackground
            source={images.tradingTipsBg}
            style={tw`w-full h-[160px] flex items-center justify-center mb-5`}>
            <Text
              style={tw`uppercase font-bold text-[28px] text-white w-[85%] text-center`}>
              {t("tips_subtitle")}
            </Text>
          </ImageBackground>
          <View style={tw`px-3 flex flex-col gap-3`}>
            {newestTips.length && (
              <View>
                <Text style={tw`text-lg text-black`}>{t("tips_newest")}</Text>
                <View style={tw`mt-3`}>{newestTips}</View>
              </View>
            )}
            {otherTips.length && (
              <View>
                <Text style={tw`text-lg text-black`}>{t("tips_oldest")}</Text>
                <View style={tw`mt-3`}>{otherTips}</View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TradingTipsScreen;
