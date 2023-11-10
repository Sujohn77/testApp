import {NavigationContainer, useRoute} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import StocksScreen from "./src/screens/stocks";
import {QueryClient, QueryClientProvider} from "react-query";
import WordSearch from "./src/screens/wordSearch";
import CryptoScreen from "./src/screens/crypto";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StyleSheet} from "react-native";

import Menu from "./src/components/menu";
import StocksPost from "./src/screens/stocksPost";
import TradingTipsScreen from "./src/screens/tradingTips";
import TradingTipsPost from "./src/screens/tradingTipsPost";
import WelcomeScreen from "./src/screens/welcome";

const queryClient = new QueryClient();

const routes = [
  {
    name: "Crypto",
    component: CryptoScreen,
  },
  {name: "Stocks", component: StocksScreen},
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
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Welcome"
          tabBar={Menu}
          screenOptions={{
            headerShown: false,
          }}>
          {routes.map(route => (
            <Tab.Screen {...route} />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
