import React, {useEffect, useState} from "react";
import images from "../../assets/images";
import {Image, ImageBackground, Text, View} from "react-native";
import tw from "twrnc";
import WelcomeQuiz from "../../components/welcomeQuiz";
import {storageVisitedWelcome} from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const welcomeSlides = [
  {image: images.welcomeFirst, title: "Large selection of cryptocurrency"},
  {
    image: images.welcomeSecond,
    title: "Invest in shares of successful companies",
  },
  {
    image: images.welcomeThird,
    title: "Become successful through automated trading",
  },
];

const stepsLength = welcomeSlides.length - 1;
const WelcomeScreen = ({navigation}) => {
  const [step, setStep] = useState(0);

  const setIsVisitedWelcome = async () => {
    try {
      await AsyncStorage.setItem(storageVisitedWelcome, JSON.stringify(true));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeStep = () => {
    if (step < stepsLength) {
      setStep(step => step + 1);
      return;
    }
    setIsVisitedWelcome();
    navigation.navigate("Stocks");
  };

  return (
    <View>
      <WelcomeQuiz />
      <ImageBackground style={tw`h-full w-full`} source={images.preloader}>
        <View style={tw`pt-[140px]`}>
          <Image
            source={welcomeSlides[step].image}
            style={tw`h-[350px] w-full mb-5`}
          />
          <Text style={tw`text-white text-4xl font-semibold ml-[30px] mt-2`}>
            {welcomeSlides[step].title}
          </Text>
        </View>
        <View
          style={tw`flex flex-row justify-between items-center absolute bottom-10 w-full`}>
          <View style={tw`flex flex-row gap-[2px] ml-[30px]`}>
            {[...Array(3)].map((item, index) => (
              <View
                key={`welcome-screen-step-${index}`}
                style={tw`h-2 w-2 ${
                  index == step ? "bg-white" : "bg-[#939393]"
                }`}
              />
            ))}
          </View>
          <View onTouchEnd={handleChangeStep}>
            <Image
              style={{
                width: 40,
                height: 20,
                marginRight: 30,
                transform: [{rotate: "180deg"}],
                tintColor: "white",
              }}
              source={images.arrowLeft}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
