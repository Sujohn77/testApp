import {Platform, StyleSheet, View} from "react-native";

export const styling = color =>
  StyleSheet.create({
    box: {
      ...Platform.select({
        ios: {
          shadowColor: color,

          shadowOpacity: 0.8,
          shadowRadius: 12,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          backgroundColor: "transparent",
        },
        android: {
          elevation: 1,
          backgroundColor: color,
        },
      }),
    },
  });

const defaultShadowColor = "rgba(0, 226, 169, 1)";
const Shadow = ({children, color = defaultShadowColor, onPress}) => {
  const styles = styling(color);
  return (
    <View style={styles.box} onTouchEnd={onPress}>
      {children}
    </View>
  );
};

export default Shadow;
