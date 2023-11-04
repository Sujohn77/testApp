import React from 'react';
import {Text, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

import tw from 'twrnc';

const FullSizeChart = ({data, symbol}) => {
  return (
    <View style={tw`bg-[#2899f63d] rounded-xl mb-5 relative h-[180px]`}>
      <View style={tw`absolute left-5 top-5`}>
        <Text style={tw`text-xl text-black font-bold`}>{symbol}</Text>
        <Text style={tw`text-slate-400`}>Apple Inc.</Text>
        {/* <Text style={tw`text-xl font-bold`}>{symbol}</Text> */}
      </View>

      <LineChart
        data={data}
        hideDataPoints1
        hideAxesAndRules
        areaChart1
        noOfSections={2.5}
        startFillColor1="#b918d5"
        endFillColor1="#289BF6"
        color="#4ffb0010"
        endOpacity1={0.3}
        stripOpacity={0.5}
        adjustToWidth
        initialSpacing={0}
        height={150}
        curved
        endSpacing={0}
      />
    </View>
  );
};

export default FullSizeChart;
