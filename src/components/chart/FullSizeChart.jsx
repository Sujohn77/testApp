import React from "react";
import {Image, Text, View} from "react-native";

import {LineChart, Grid, AreaChart} from "react-native-svg-charts";
import {LinearGradient, Stop, Defs, Line} from "react-native-svg";
import * as shape from "d3-shape";
import tw from "twrnc";
import {stocksList} from "../../constants";
export const Gradient = ({colors}) => (
  <Defs>
    <LinearGradient id={"gradient"} x1={"0%"} y1={"0%"} x2={"0%"} y2={"100%"}>
      <Stop offset={"0%"} stopColor={colors[0]} stopOpacity={0.7} />
      <Stop offset={"100%"} stopColor={colors[1]} stopOpacity={0.15} />
    </LinearGradient>
  </Defs>
);
const currency = "$";
const smallOptions = {
  style: {height: 70, width: 165, bottom: 10},
  // contentInset: {top: 60, left: 180, right: 15},
  svg: {stroke: "#FF7700", fill: "url(#gradient)"},
  start: -100,
};
const defaultOptions = {
  style: {height: 180, width: 400},
  svg: {fill: "url(#gradient)"},
  contentInset: {top: 85, bottom: 30},
};
const FullSizeChart = ({
  data,
  symbol,
  image,
  small = false,
  subTitle,
  title,
  graphDiffValue,
}) => {
  const gradientColors = small
    ? ["#F99F01", "#908FEC"]
    : ["#B706D6", "#289BF6"];
  const options = small ? smallOptions : defaultOptions;
  const renderChart = () => (
    <AreaChart data={data} curve={shape.curveNatural} {...options}>
      <Gradient colors={gradientColors} />
    </AreaChart>
  );
  const isGrowth = graphDiffValue > 0;
  const growthSign = isGrowth ? "+" : "-";
  return (
    <View
      style={tw`${
        small ? "border-b-4 border border-[#B706D6]" : "bg-[#2899f63d]"
      } rounded-xl mb-5 relative ${
        small ? "h-[150px]" : "h-[180px]"
      } overflow-hidden`}>
      <View style={tw`absolute left-3 top-3`}>
        <View style={tw`flex flex-row gap-2 items-center`}>
          {image ? (
            <Image source={image} style={tw`w-[40px] h-[40px]`} />
          ) : null}
          <View>
            <Text style={tw`text-lg text-black font-bold`}>{title}</Text>
            <Text style={tw`text-slate-400 text-[9px] mb-[2px]`}>
              {subTitle}
            </Text>
          </View>
        </View>

        <Text
          style={tw`text-lg font-semibold  ${
            small ? "mt-10 text-2xl" : "mt-[2px]"
          }`}>
          {!!data?.length && currency}
          {!!data?.length && data[0].toLocaleString()}
        </Text>
      </View>
      {graphDiffValue ? (
        <View
          style={tw`${
            isGrowth ? "bg-[#DCFFCC]" : "bg-rose-500"
          }  px-2 py-1 rounded-lg absolute top-2 right-4`}>
          <Text
            style={tw` ${
              isGrowth ? "text-[#049C6B]" : "text-rose-200"
            }  font-semibold text-center`}>
            {growthSign}
            {graphDiffValue}%
          </Text>
        </View>
      ) : null}
      {small ? (
        <View style={tw`flex-1 absolute left-[180px] top-[60px]`}>
          {renderChart()}
        </View>
      ) : (
        renderChart()
      )}
    </View>
  );
};

export default FullSizeChart;
