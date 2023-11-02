import React, {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import tw from 'twrnc';
import {fetchCryptoPrices} from '../../api/marketData';
import {ActivityIndicator, ImageBackground, Text, View} from 'react-native';
import FullSizeChart from '../../components/chart/FullSizeChart';
import Header from '../../components/header';
import images from '../../../public/images';
import {stockGraph} from '../../constants';
import {isObject} from 'twrnc/dist/esm/types';

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

const mock = {
  'Meta Data': {
    '1. Information': 'Daily Prices (open, high, low, close) and Volumes',
    '2. Symbol': 'AAPL',
    '3. Last Refreshed': '2023-11-01',
    '4. Output Size': 'Compact',
    '5. Time Zone': 'US/Eastern',
  },
  'Time Series (Daily)': {
    '2023-11-01': {
      '1. open': '171.0000',
      '2. high': '174.2300',
      '3. low': '170.1200',
      '4. close': '173.9700',
      '5. volume': '56934906',
    },
  },
};

const StocksScreen = () => {
  const {data, isLoading} = useQuery('fetchMarketData', fetchCryptoPrices);

  const dailyStocksData = data ? Object.values(data)[1] : undefined;
  const datasets = dailyStocksData
    ? Object.values(Object.values(dailyStocksData)[1]).map(item => ({
        value: Object.values(item)[0],
      }))
    : [];

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
      {datasets.length && <FullSizeChart data={datasets} symbol={stockGraph} />}
      <Text style={tw`text-2xl text-black font-semibold mb-3`}>
        Information block
      </Text>
      <View style={tw`overflow-hidden rounded-lg shadow-2xl`}>
        <ImageBackground
          source={images.textBanner}
          style={{
            height: 160,
            paddingLeft: 35,
            paddingTop: 35,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundPositionX: 100,
            transform: 'scale(1.2)',
          }}>
          <Text style={tw`font-semibold text-white text-[18px] w-[50%] `}>
            How can artificial intelligence be used to become a trader?
          </Text>
        </ImageBackground>
      </View>
      <Text style={tw`text-2xl text-black font-semibold mb-3`}>
        Stocks Prices
      </Text>
      <View style={tw`h-20 p-4 w-full rounded-md bg-[#6070ff41]`}></View>
      {/* {data.map((item, key) => (
        <View style={tw`flex flex-row gap-2`} key={key}>
          <Text>{item.symbol} </Text>
          <Text>{item.price}</Text>
        </View>
      ))} */}
    </View>
  );
};

export default StocksScreen;
