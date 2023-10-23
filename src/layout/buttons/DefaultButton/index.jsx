import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

export default function DefaultButton(props) {
  const {onPress, title = 'Save', styles} = props;
  const style = styles || defaultStyles;
  return (
    <Pressable style={style.button} onPress={onPress}>
      <Text style={style.text}>{title}</Text>
    </Pressable>
  );
}

const defaultStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
