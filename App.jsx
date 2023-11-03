import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuizScreen from './src/screens/quiz/Quiz';

import StocksScreen from './src/screens/stocks';
import {QueryClient, QueryClientProvider} from 'react-query';
import Header from './src/components/header';

const queryClient = new QueryClient();
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Stocks"
          screenOptions={{
            header: ({route}) => <Header name={route.name} />,
          }}>
          <Stack.Screen
            name="Stocks"
            component={StocksScreen}
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
