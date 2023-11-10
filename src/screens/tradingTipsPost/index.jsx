import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import Shadow from "../../components/shadow";
import {ImageBackground, SafeAreaView, Text, View, Image} from "react-native";
import images from "../../assets/images";

const TradingTipsPost = props => {
  const {navigation, route} = props;
  const {
    params: {imageName, title, text},
  } = route;

  return (
    <SafeAreaView>
      <View style={tw`p-5`}>
        <View onTouchEnd={() => navigation?.goBack()}>
          <Image
            source={images.arrowLeft}
            color="black"
            style={tw`mb-5 h-[20px] w-[40px]`}
          />
        </View>

        <View
          style={tw`relative flex flex-row mb-3 items-center gap-2 w-full bg-sky-200 border-l-[#BD00DD] border-l-2 rounded-lg px-3 py-5`}>
          <Text
            numberOfLines={2}
            style={tw`text-xl  w-[90%] font-semibold text-[#0048BE]`}>
            {title}
          </Text>
          {imageName && (
            <Image
              style={tw`w-[80px] h-[80px] absolute -top-[40px] right-1`}
              source={images[imageName]}
            />
          )}
        </View>

        {text && <Text style={tw`text-2xl mt-2 leading-6`}>{text}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default TradingTipsPost;
