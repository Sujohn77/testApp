import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultQuizUrl = 'https://en.wikipedia.org/wiki/Main_Page';
const QuizScreen = () => {
  const [quizUrl, setQuizUrl] = useState(defaultQuizUrl);

  useEffect(() => {
    const getUrl = async () => {
      const actualQuizUrl = await AsyncStorage.getItem('quizUrl');
      actualQuizUrl && setQuizUrl(actualQuizUrl);
    };
    getUrl();
  }, []);

  const storeData = async url => {
    try {
      await AsyncStorage.setItem('quizUrl', url);
    } catch (error) {
      // Error saving data
      console.log('Error while saving webview url: ', quizUrl);
    }
  };
  console.log(quizUrl);

  return (
    <WebView
      onNavigationStateChange={data => {
        if (data.url.includes('https://')) {
          const {url} = data;
          storeData(url);
        }
      }}
      source={{
        uri: quizUrl,
      }}
    />
  );
};

export default QuizScreen;
