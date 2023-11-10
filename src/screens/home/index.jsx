import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../../layout/buttons/GradientButton';

import images from '../../assets/images';

const navIcons = [
  require('../../assets/images/crypto.png'),
  require('../../assets/images/help.png'),
];

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={tw`h-full flex justify-center items-center`}
          source={images.preloader}>
          <Image
            source={images.preloadingLogo}
            style={tw`w-[50%] min-w-[200px] h-[240px]`}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
