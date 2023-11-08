import React from 'react';
import {Text, View} from 'react-native';

import {LineChart, Grid, AreaChart} from 'react-native-svg-charts';
import {LinearGradient, Stop, Defs, Line} from 'react-native-svg';

import tw from 'twrnc';
import {stocksList} from '../../constants';
export const Gradient = ({colors}) => (
  <Defs>
    <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset={'0%'} stopColor={colors[0]} stopOpacity={0.8} />
      <Stop offset={'100%'} stopColor={colors[1]} stopOpacity={0.2} />
    </LinearGradient>
  </Defs>
);
const currency = '$';
const FullSizeChart = ({data = [], symbol}) => {
  const gradientColors = ['#B706D6', '#289BF6'];
  return (
    <View
      style={tw`bg-[#2899f63d] rounded-xl mb-5 relative h-[180px] overflow-hidden`}>
      <View style={tw`absolute left-3 top-3`}>
        <Text style={tw`text-lg text-black font-bold`}>{symbol}</Text>
        <Text style={tw`text-slate-400 text-[9px] mb-[2px]`}>
          {stocksList[symbol].subTitle}
        </Text>
        <Text style={tw`text-lg font-bold mt-[2px]`}>
          {!!data.length && currency}
          {data[0]}
        </Text>
      </View>

      <AreaChart
        style={{height: 180}}
        data={data}
        contentInset={{top: 85, bottom: 30}}
        svg={{fill: 'rgba(134, 65, 244, 0.5)'}}>
        <Gradient colors={gradientColors} />
      </AreaChart>
    </View>
  );
};

export default FullSizeChart;
