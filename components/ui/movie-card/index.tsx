import Rating from "@/components/ui/rating";
import { Colors } from "@/constants/Colors";
import { MovieCardProps } from "@/type/inderface";
import { Link } from "expo-router";
import React from "react";

import { Image, StyleSheet, Text, View } from "react-native";

const MovieCard: React.FC<MovieCardProps> = ({
  poster_path,
  vote_average,
  title,
  id,
}) => {
  return (
    <Link
      href={{
        pathname: "/movie/[id]",
        params: { id: id },
      }}
    >
      <View style={styles.movieCard}>
        <Image
          source={{ uri: "https://image.tmdb.org/t/p/w500/" + poster_path }}
          style={styles.movieImage}
        />
        <Rating vote_average={vote_average} style={styles.movieRating} />
        <Text numberOfLines={1} style={styles.movieTitle}>
          {title}
        </Text>
        <Text style={styles.movieGenre}>Action</Text>
      </View>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieCard: {
    width: 147,
    height: 252,
    marginRight: 10,
    backgroundColor: Colors.card_background,
    borderRadius: 8,
    overflow: "hidden",
  },
  movieImage: {
    width: 147,
    height: 194,
  },
  movieTitle: {
    color: Colors.text,
    fontSize: 14,
    marginTop: 10,
    paddingLeft: 5,
  },
  movieRating: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  movieGenre: {
    color: Colors.secendaryText,
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 5,
  },
});
