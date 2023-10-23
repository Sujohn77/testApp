import React from 'react';
import WebView from 'react-native-webview';
import {Platform} from 'react-native';

const QuizScreen = () => {
  return (
    <WebView
      source={{
        uri:
          Platform.OS !== 'web'
            ? 'https://academy.binance.com/en'
            : 'https://cointelegraph.com/category/quiz',
      }}
    />
  );
};

export default QuizScreen;
