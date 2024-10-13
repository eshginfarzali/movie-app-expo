import BackIcon from "@/assets/icons/back.png";
import Title from "@/components/ui/title";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

const Header = ({ title }: { title: string }) => {
  const navgiton = useNavigation();
  return (
    <View style={styles.backConatiner}>
      <Pressable onPress={navgiton.goBack}>
        <Image source={BackIcon} style={styles.backIcon} />
      </Pressable>
      <Title title={title} style={styles.backText} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  backConatiner: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: 10,
  },
  backIcon: {
    width: 14,
    height: 14,
    paddingHorizontal: 5,
  },
  backText: {
    marginLeft: 10,
  },
});
