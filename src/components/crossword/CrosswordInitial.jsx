import React from "react";
import {
  ImageBackground,
  ImageBackgroundBase,
  Pressable,
  Text,
  View,
} from "react-native";
import images from "../../assets/images";
import tw from "twrnc";

const CrosswordInitial = ({onPress}) => {
  return (
    <ImageBackground
      source={images.ai}
      style={tw`w-full h-full flex items-center `}>
      <ImageBackground
        source={images.radiantButton}
        imageStyle={{borderRadius: 20}}
        style={tw`h-18 flex justify-center w-[280px] absolute bottom-25`}>
        <View onTouchEnd={onPress}>
          <Text style={tw`uppercase text-white text-center text-xl`}>
            Start crossword
          </Text>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

export default CrosswordInitial;
