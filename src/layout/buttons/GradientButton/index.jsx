import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import React from 'react';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import DefaultButton from '../DefaultButton';

const GradientButton = ({ name, route, colors, style, navigation }) => {
  return (
    <LinearGradient
      colors={colors}
      style={tw`uppercase grow-0 text-white text-center w-[300px] mb-[120px] text-3xl font-semibold rounded-lg text-white`}
    >
      <DefaultButton
        title={name}
        onPress={() => navigation.navigate(route)}
        styles={styles}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 4,
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
});

export default GradientButton;
