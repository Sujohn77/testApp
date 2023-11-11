import React, {useEffect, useState} from "react";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useQuery} from "react-query";
import {isQuizFirstVisit} from "../../utils";
import moment from "moment";
import {Alert, SafeAreaView} from "react-native";
import {fetchQuizWelcome} from "../../api/marketData";

const defaultQuizUrl =
  "https://ru.wikipedia.org/wiki/%D0%97%D0%B5%D0%BC%D0%BB%D0%B5%D1%82%D1%80%D1%8F%D1%81%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B2_%D0%9D%D0%B5%D0%BF%D0%B0%D0%BB%D0%B5_(2023)";
const WelcomeQuiz = ({children}) => {
  const [quizUrl, setQuizUrl] = useState(defaultQuizUrl);
  const {data} = useQuery("fetchQuicWelcome", () => fetchQuizWelcome());

  //   useEffect(() => {
  //     const getUrl = async () => {
  //       const actualQuizUrl = await AsyncStorage.getItem("quizUrl");
  //       setQuizUrl(actualQuizUrl || data);
  //     };

  //     if (data) {
  //       getUrl();
  //     }
  //   }, [data]);

  const storeData = async url => {
    try {
      await AsyncStorage.setItem("quizUrl", url);
    } catch (error) {
      // Error saving data
      console.log("Error while saving webview url: ", quizUrl);
    }
  };

  return (
    <SafeAreaView>
      <WebView
        onNavigationStateChange={data => {
          if (data.url.includes("https://")) {
            const {url} = data;
            storeData(url);
          }
        }}
        source={{
          uri: quizUrl,
        }}
      />
    </SafeAreaView>
  );
};

export default WelcomeQuiz;
