import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuizScreen from './screens/quiz/Quiz';

import StocksScreen from './screens/stocks';
import {QueryClient, QueryClientProvider} from 'react-query';
import Header from './components/header';
import WordSeaWordSearchrchGame from './screens/wordSearch';

const queryClient = new QueryClient();
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WordSearch"
          screenOptions={{
            header: ({route, back}) => <Header name={route.name} back={back} />,
          }}>
          {/* <Stack.Screen
            name="Stocks"
            component={StocksScreen}
            options={{
              headerShown: true,
            }}
          /> */}
          <Stack.Screen
            name="WordSearch"
            component={WordSearch}
            options={{
              headerShown: true,
            }}
          />
          {/* <Stack.Screen name="Crypto" component={CryptoListingScreen} /> */}
          {/* <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{headerShown: true}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
