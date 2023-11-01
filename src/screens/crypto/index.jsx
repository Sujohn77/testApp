import React, {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import tw from 'twrnc';
import {fetchCryptoPrices} from '../../api/marketData';
import {ActivityIndicator, Text, View} from 'react-native';
import FullSizeChart from '../../components/chart/FullSizeChart';

const chartData = [
  {value: 3},
  {value: 6},
  {value: 5},
  {value: 9},
  {value: 11},
  {value: 18},
  {value: 15.5},
  {value: 16},
  {value: 24},
  {value: 25},
  {value: 20},
  {value: 21},
  {value: 24},
  {value: 26},
  {value: 30},
  {value: 35},
  {value: 33},
  {value: 32},
  {value: 36},
  {value: 38},
  {value: 45},
  {value: 50},
  {value: 54},
  {value: 57},
  {value: 59},
  {value: 60},
  {value: 61},
  {value: 61.5},
  {value: 61.75},
  {value: 61.85},
  {value: 62},
  {value: 62.1},
  {value: 59},
  {value: 60},
  {value: 61},
];
const CryptoListingScreen = () => {
  const {data, isLoading} = useQuery('fetchMarketData', fetchCryptoPrices);

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
          <Text>{item.symbol} </Text>
          <Text>{item.price}</Text>
        </View>
      ))}
    </View>
  );
};

export default CryptoListingScreen;
