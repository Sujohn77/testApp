import React, {useEffect, useState} from "react";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert, SafeAreaView} from "react-native";
import {QUIZ_CONTENT_URL} from "@env";

const WelcomeQuiz = ({route}) => {
  const [quizUrl, setQuizUrl] = useState();

  useEffect(() => {
    const getQuizUrl = async () => {
      const actualQuizUrl = await AsyncStorage.getItem("quizUrl");
      setQuizUrl(actualQuizUrl || route.params.dataUrl || QUIZ_CONTENT_URL);
    };

    if (route.params?.dataUrl) {
      getQuizUrl();
    }
  }, [route.params?.dataUrl]);

  const storeData = async url => {
    try {
      await AsyncStorage.setItem("quizUrl", url);
    } catch (error) {
      // console.log("Error while saving webview url: ", quizUrl);
    }
  };

  const onNavigationStateChange = data => {
    if (data.url.includes("https://")) {
      const {url} = data;
      storeData(url);
    }
  };

  if (!quizUrl) {
    return null;
  }

  const source = {
    uri: quizUrl,
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        onNavigationStateChange={onNavigationStateChange}
        source={source}
      />
    </SafeAreaView>
  );
};

export default WelcomeQuiz;
