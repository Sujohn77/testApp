import React, {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import tw from 'twrnc';
import {fetchStockData, fetchStockHistory} from '../../api/marketData';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
// import FullSizeChart from '../../components/chart/FullSizeChart';
import Header from '../../components/header';
import images from '../../images';
import {stockGraph, stocksIds, stocksList} from '../../constants';

import cryptoImages from '../../images/crypto';
import FullSizeChart from '../../components/chart/FullSizeChart';

// const chartData = [183, 182, 186.5, 184];

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
  const {data, isLoading, error} = useQuery('fetchStockHistory', () =>
    fetchStockHistory(stockGraph),
  );
  console.log(data);
  // const {data, isLoading: isLoadingStocks} = useQuery(
  //   'fetchStockData',
  //   fetchStockData,
  // );
  if (!data) {
    console.log(error);
    return (
      <View style={tw`mt-8`}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={tw`relative mt-8 mx-8 py-5`}>
      <FullSizeChart data={data.o} symbol={stockGraph} />
      <Text style={tw`text-2xl text-black font-semibold mb-3`}>
        Information block
      </Text>
      <View style={tw`overflow-hidden rounded-lg shadow-2xl mb-3`}>
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
      <Text style={tw`text-2xl text-black font-semibold mb-3`}>
        Cryptocurrency Prices
      </Text>
      {/* {data &&
        stocksIds.map((key, index) => {
          const price = data[key];
          const yesterdayPrice = stocksDayBefore ? cryptoDayBefore[key] : 0;
          const percentageDiff = (price / yesterdayPrice - 1) * 100;
          const isGrowth = percentageDiff > 0;
          const percentageSign = isGrowth ? '+' : '';

          return (
            <View
              style={tw`h-16 p-3 w-full flex flex-row gap-2 mb-3 rounded-md bg-[#6070ff41]`}
              key={key}>
              <Image
                source={cryptoImages[key]}
                style={tw`w-10 h-10 shrink-0`}
              />
              <View style={tw`flex-1`}>
                <View style={tw`flex flex-row justify-between w-max `}>
                  <Text style={tw`font-semibold text-sm`}>
                    {stocksList[key].title}
                  </Text>
                  <Text style={tw`font-semibold text-sm w-min `}>
                    ${data[key]}
                  </Text>
                </View>
                <View style={tw`flex flex-row justify-between gap-2`}>
                  <Text style={tw`text-slate-500 text-xs`}>
                    {stocksList[key].subTitle}
                  </Text>
                  {cryptoDayBefore[key] && (
                  <Text
                    style={tw`${
                      isGrowth ? 'text-lime-500' : 'text-rose-300'
                    } text-xs`}>
                    {percentageSign}
                    {percentageDiff.toFixed(2)}%
                  </Text>
                )}
                </View>
              </View>
            </View>
          );
        })} */}
    </View>
  );
};

export default StocksScreen;
