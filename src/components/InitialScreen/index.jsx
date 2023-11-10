import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import images from '../../assets/images';




const InitialScreen = () => {
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
        <Text>test</Text>
      </View>
    </SafeAreaView>
};


export default InitialScreen;
