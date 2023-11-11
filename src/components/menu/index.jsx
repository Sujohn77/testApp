import React, {useState} from "react";
import icons from "../../assets/icons";
import tw from "twrnc";
import {Alert, Animated, Image, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {Link, useRoute} from "@react-navigation/native";

const iconNames = Object.keys(icons);
const navLinks = {
  [iconNames[0]]: "Crypto",
  [iconNames[1]]: "Stocks",
  [iconNames[2]]: "WordSearch",
  [iconNames[3]]: "Crypto",
};

export const excludeRoutes = ["StocksPost", "TradingTipsPost", "Welcome"];

const Menu = ({state, navigation}) => {
  const navigate = name => {
    navigation.navigate(name);
  };

  const menuItems = state?.routes
    ?.filter(item => !excludeRoutes.includes(item.name))
    .map((item, index) => {
      const isActive = state.index == index;
      return (
        <View key={`menu-item-${index}`} style={tw`relative py-1`}>
          {isActive && (
            <LinearGradient
              colors={["#BD00DD", "#289BF6"]}
              style={tw`absolute w-16 h-16 -left-[14px] -top-10 rounded-full`}
            />
          )}

          <View onTouchEnd={() => navigate(item.name)}>
            <Image
              source={icons[item.name.toLowerCase()]}
              style={tw`w-[35px] h-[35px] ${isActive ? "-mt-7" : ""}`}
              width={25}
              height={25}
            />
          </View>
        </View>
      );
    });
  const isActive = navigation.isFocused();
  const isExcludeRoute = excludeRoutes.includes(state.routeNames[state.index]);
  console.log(isActive, isExcludeRoute);

  if (isActive && isExcludeRoute) return <View />;

  return (
    <View
      style={tw`flex flex-row pb-2 items-center justify-between px-10 bg-indigo-900 h-[70px] w-full`}>
      {menuItems}
    </View>
  );
};

export default Menu;
