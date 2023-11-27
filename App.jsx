import {NavigationContainer, useRoute} from "@react-navigation/native";

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
import {LogBox} from "react-native";
import {filterRoutesWithPrivacy} from "./src/utils";
import {fetchAddons} from "./src/api/marketData";

LogBox.ignoreAllLogs();

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
  const [data, setData] = useState({date: "", link: ""});

  useEffect(() => {
    const getIsVisited = async () => {
      const isVisited = await AsyncStorage.getItem(storageVisitedWelcome);
      setIsVisitedWelcome(!!isVisited);
    };

    const getAddons = async () => {
      const data = await fetchAddons();
      setData(data);
    };

    getAddons();
    getIsVisited();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (isVisitedWelcome == null) {
    return null;
  }
  const appRoutes = routes.filter(filterRoutesWithPrivacy(data));

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={
            isVisitedWelcome || appRoutes.length == 1
              ? "WelcomeQuiz"
              : "Welcome"
          }
          tabBar={props => <Menu {...props} showNav={appRoutes.length > 1} />}
          screenOptions={{
            headerShown: false,
          }}>
          {appRoutes.map((route, index) => (
            <Tab.Screen
              key={`route-${index}`}
              {...route}
              initialParams={{
                dataUrl: data.link,
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
