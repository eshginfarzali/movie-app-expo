import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

const Title = ({
  title,
  style,
}: {
  title: string;
  style?: StyleProp<TextStyle>;
}) => {
  return (
    <Text numberOfLines={1} style={[styles.textTitle, style]}>
      {title}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({
  textTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
