import React from "react";
import {
  Alert,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import tw from "twrnc";
import {searchWords} from "../../constants";
import {capitalize} from "../../utils";
const DefaultModal = ({onClose, visible}) => {
  const words = searchWords.map((word, key) => (
    <View key={`search-word-${key}`}>
      <Text
        style={tw`text-xl pb-2 font-semibold`}>{`\u2022 ${word.toLocaleUpperCase()}`}</Text>
    </View>
  ));

  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={tw`bg-[#00000080] flex-1 items-center justify-center`}>
          <TouchableWithoutFeedback>
            <View
              style={tw`h-[300px] pt-4 px-6 w-[80%] bg-white shadow-xl rounded-xl`}>
              <Text style={tw`text-2xl text-center mb-3 font-bold`}>
                ANSWERS
              </Text>
              {words}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DefaultModal;
