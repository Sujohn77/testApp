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

const navIcons = [
  require('../../../public/imgs/security.png'),
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
    <SafeAreaView style={layoutStyles.container}>
      <View>
        <ImageBackground
          source={require('../../../public/images/preloader.png')}>
          <View style={tw`pt-10 relative flex items-center h-full px-2`}>
            <View style={tw`grow`}>
              <Text
                style={tw`text-white text-3xl text-center uppercase font-bold`}>
                Take the 5 min quiz
              </Text>
              <Text style={tw`text-white text-2xl text-center mt-3 `}>
                Тo see if you can do it
              </Text>
            </View>
            <GradientButton
              name="START NOW"
              route="Quiz"
              colors={['#FFF500', '#F9E600', '#CA6D00']}
              style={styles.gradientButton}
              navigation={navigation}
            />
          </View>
          <View
            style={tw`flex flex-row justify-around absolute bottom-0 bg-cyan-500 w-full py-2`}>
            {menuItems}
          </View>
        </ImageBackground>
        <Text>test</Text>
      </View>
    </SafeAreaView>
  );
};

const layoutStyles = StyleSheet.create({
  container: {
    margin: 0,
    marginBottom: 0,
    padding: 0,
  },

  gradientHover: {
    flex: 1,
    width: '100%',
    backgroundImage: 'linear-gradient(45deg, #ff0000, #0000ff)',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
  },

  gradientButton: {
    height: 60,
    width: 'auto',
    borderRadius: 7,
    textAlign: 'center',
    margin: 'auto',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const styles = StyleSheet.create({
  linearGradient: {paddingLeft: 15, paddingRight: 15, borderRadius: 5},
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  containerMain: {
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    marginTop: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 65,
    width: 300,
  },
});

export default HomeScreen;
