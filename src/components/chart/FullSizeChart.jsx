import React from 'react';
import { Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import tw from 'twrnc';

const FullSizeChart = ({ data }) => {
  return (
    <View style={tw`bg-lime-50 rounded-xl mb-5 relative`}>
      <View style={tw`absolute left-5 top-5`}>
        <Text style={tw`text-xl text-black font-bold`}>AAPL</Text>
        <Text style={tw`text-slate-400`}>Apple Inc.</Text>
        <Text style={tw`text-xl font-bold`}>$174,73</Text>
      </View>
      <LineChart
        data={data}
        hideDataPoints1
        hideAxesAndRules
        areaChart1
        startFillColor1="#4ffb00c1"
        endFillColor1="#4ffb00c1"
        color="#4ffb0010"
        endOpacity1={0.05}
        stripOpacity={0.5}
        adjustToWidth
        initialSpacing={0}
        curved
        endSpacing={0}
      />
    </View>
  );
};

export default FullSizeChart;
