import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import tw from 'twrnc';
import { fetchCryptoPrices } from '../../api/marketData';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import FullSizeChart from '../../components/chart/FullSizeChart';

const mockIcons = [
  require('../../../public/imgs/btc.png'),
  require('../../../public/imgs/bnb.png'),
  require('../../../public/imgs/xrp.png'),
];

const mockData = [
  { value: 3 },
  { value: 6 },
  { value: 5 },
  { value: 9 },
  { value: 11 },
  { value: 18 },
  { value: 15.5 },
  { value: 16 },
  { value: 24 },
  { value: 25 },
  { value: 20 },
  { value: 21 },
  { value: 24 },
  { value: 26 },
  { value: 30 },
  { value: 35 },
  { value: 33 },
  { value: 32 },
  { value: 36 },
  { value: 38 },
  { value: 45 },
  { value: 50 },
  { value: 54 },
  { value: 57 },
  { value: 59 },
  { value: 60 },
  { value: 61 },
  { value: 61.5 },
  { value: 61.75 },
  { value: 61.85 },
  { value: 62 },
  { value: 62.1 },
  { value: 59 },
  { value: 60 },
  { value: 61 },
];
const CryptoListingScreen = () => {
  const { data, isLoading } = useQuery('fetchMarketData', fetchCryptoPrices);

  if (isLoading) {
    return (
      <View style={tw`mt-8`}>
        <ActivityIndicator />
      </View>
    );
  }
  // Alert.alert('test', 'msg');

  return (
    <View style={tw`relative mt-8 mx-8 py-5`}>
      <Text style={tw`text-center mb-3 text-3xl font-semibold`}>Stocks</Text>
      <FullSizeChart data={chartData} />
      {data.map((item, key) => (
        <View style={tw`flex flex-row gap-2`} key={key}>
          <Image src={mockIcons[key]} alt={key} />
          <View>
            <View style={tw`flex w-max space-between font-bold text-lg`}>
              <Text>{item.symbol} </Text>
              <Text>{item.price}</Text>
            </View>
            <View style={tw`flex w-max space-between font-bold text-lg`}>
              <Text style={tw`text-slate-300`}>{item.symbol}</Text>
              <Text style={tw`text-lime-300`}>+25%</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CryptoListingScreen;
