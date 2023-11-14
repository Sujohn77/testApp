import {NavigationContainer, useRoute} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import StocksScreen from "./src/screens/stocks";
import {QueryClient, QueryClientProvider} from "react-query";
import WordSearch from "./src/screens/wordSearch";
import CryptoScreen from "./src/screens/crypto";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Menu from "./src/components/menu";
import StocksPost from "./src/screens/stocksPost";
import TradingTipsScreen from "./src/screens/tradingTips";
import TradingTipsPost from "./src/screens/tradingTipsPost";
import WelcomeScreen from "./src/screens/welcome";
import {useEffect, useState} from "react";
import SplashScreen from "react-native-splash-screen";
import {storageVisitedWelcome} from "./src/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeQuiz from "./src/screens/welcomeQuiz";

const queryClient = new QueryClient();

const routes = [
  {
    name: "Crypto",
    component: CryptoScreen,
  },
  {name: "Stocks", component: StocksScreen},
  {name: "WelcomeQuiz", component: WelcomeQuiz},
  {name: "WordSearch", component: WordSearch},
  {name: "TradingTips", component: TradingTipsScreen},
  {name: "TradingTipsPost", component: TradingTipsPost},
  {name: "Welcome", component: WelcomeScreen},

  {
    name: "StocksPost",
    component: StocksPost,
  },
];

const Tab = createBottomTabNavigator();
const App = () => {
  const [isVisitedWelcome, setIsVisitedWelcome] = useState(null);
  useEffect(() => {
    const getIsVisited = async () => {
      const isVisited = await AsyncStorage.getItem(storageVisitedWelcome);
      setIsVisitedWelcome(!!isVisited);
    };

    getIsVisited();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (isVisitedWelcome == null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={isVisitedWelcome ? "WelcomeQuiz" : "Welcome"}
          tabBar={Menu}
          screenOptions={{
            headerShown: false,
          }}>
          {routes.map((route, index) => (
            <Tab.Screen key={`route-${index}`} {...route} />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
