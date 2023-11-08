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
import ImageAssets from '../../../public/images';
import images from '../../../public/images';
const navIcons = [
  require('../../../public/imgs/crypto.png'),
  require('../../../public/imgs/help.png'),
];

const HomeScreen = ({navigation}) => {
  const [activeMenuItem, setActiveMenuItem] = useState(2);
  // const [fontsLoaded, fontError] = useFonts({
  //     InterRegular: require('../../../assets/fonts/Inter-Regular.ttf'),
  // });
  const isDarkMode = useColorScheme() === 'dark';

  const menuItems = navIcons.map((icon, key) => {
    const isActive = key === activeMenuItem;
    return (
      <View
        key={key}
        style={tw.style('relative py-1')}
        onTouchEnd={() => setActiveMenuItem(key)}>
        {isActive && (
          <LinearGradient
            colors={['#50FB00', '#2C8A00']}
            style={tw.style('absolute w-16 h-16 -left-3 -top-6 rounded-full')}
          />
        )}

        <Image
          source={icon}
          style={tw`w-[40px] h-[40px] ${isActive ? '-mt-4' : ''}`}
          width={25}
          height={25}
        />
      </View>
    );
  });

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
