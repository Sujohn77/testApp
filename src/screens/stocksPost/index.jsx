import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import Shadow from "../../components/shadow";
import {ImageBackground, SafeAreaView, Text, View, Image} from "react-native";
import images from "../../assets/images";

const StocksPost = props => {
  const {navigation, route} = props;
  const {
    params: {imageName, imageText, text},
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
        {imageName && (
          <Shadow color={"rgb(67,5,202,0.7)"}>
            <ImageBackground
              source={images[imageName]}
              style={{
                height: 160,
                paddingLeft: 15,
                paddingTop: 25,
                borderRadius: 15,
                overflow: "hidden",
              }}>
              {text && (
                <Text style={tw`font-semibold text-white text-xl w-[50%] `}>
                  {imageText}
                </Text>
              )}
            </ImageBackground>
          </Shadow>
        )}
        {text && <Text style={tw`text-xl mt-3`}>{text}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default StocksPost;
