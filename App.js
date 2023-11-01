import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuizScreen from './src/screens/quiz/Quiz';

import CryptoListingScreen from './src/screens/crypto';

import HomeScreen from './src/screens/home';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Crypto" component={CryptoListingScreen} />
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
