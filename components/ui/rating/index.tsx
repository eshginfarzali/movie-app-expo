import StarIcon from "@/assets/icons/star.png";
import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Rating = ({
  vote_average,
  style,
}: {
  vote_average: number;
  style?: StyleProp<TextStyle>;
}) => {
  return (
    <View style={[styles.movieRating, style]}>
      <Text style={styles.rating}>
        <Image source={StarIcon} style={styles.starIcon} />
        {vote_average.toFixed(1)}
      </Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  movieRating: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 9,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.9)",
    overflow: "hidden",
  },
  movieGenre: {
    color: Colors.secendaryText,
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 5,
  },
  rating: {
    marginTop: 10,
    fontSize: 14,
    color: Colors.genre,
  },

  starIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});
