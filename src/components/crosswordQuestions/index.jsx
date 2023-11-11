import React from "react";
import images from "../../assets/images";
import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import tw from "twrnc";
import {crosswordQuestions} from "../../constants";
import Shadow from "../shadow";

const CrosswordQuestions = () => {
  return (
    <ImageBackground
      source={images.crosswordPhone}
      resizeMethod="resize"
      resizeMode="repeat"
      style={tw`w-[100%] h-[300px] absolute bottom-0`}>
      <View
        style={tw`flex flex-row flex-wrap justify-between gap-1 gap-y-2 pt-10 px-3`}>
        {crosswordQuestions.map((question, key) => (
          <TouchableOpacity
            style={tw`px-3 border-2 border-white rounded-lg bg-indigo-900 flex items-center justify-center h-[70px] w-[48%]`}
            activeOpacity={0.7}
            key={`question-${key}`}>
            <View>
              <Text style={tw`text-white text-center font-semibold`}>
                {question}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

export default CrosswordQuestions;
