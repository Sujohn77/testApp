import React, {useState} from 'react';
import icons from '../../assets/icons';
import tw from 'twrnc';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Link} from '@react-navigation/native';
const iconNames = Object.keys(icons);
const navLinks = {
  [iconNames[0]]: 'Crypto',
  [iconNames[1]]: 'Stocks',
  [iconNames[2]]: 'WordSearch',
  [iconNames[3]]: 'Crypto',
};
const Menu = ({activeIndex = 0, navigation}) => {
  const [activeMenuItem, setActiveMenuItem] = useState(activeIndex);
  const menuItems = Object.keys(icons).map((name, key) => {
    const isActive = key === activeMenuItem;
    return (
      <View
        key={key}
        style={tw`relative py-1`}
        onTouchEnd={() => setActiveMenuItem(key)}>
        {isActive && (
          <LinearGradient
            colors={['#BD00DD', '#289BF6']}
            style={tw`absolute w-16 h-16 -left-[14px] -top-10 rounded-full`}
          />
        )}

        <View onTouchEnd={() => navigation.navigate(navLinks[name])}>
          <Image
            source={icons[name]}
            style={tw`w-[35px] h-[35px] ${isActive ? '-mt-7' : ''}`}
            width={25}
            height={25}
          />
        </View>
      </View>
    );
  });
  return (
    <View
      style={tw`flex flex-row pb-2 items-center justify-between px-10 bg-indigo-900 absolute bottom-0 mx-3 h-[70px] w-full`}>
      {menuItems}
    </View>
  );
};

export default Menu;
