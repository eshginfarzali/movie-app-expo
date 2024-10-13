import StarIcon from "@/assets/icons/star.png";
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
        <View style={styles.movieRating}>
          <Text style={styles.rating}>
            <Image source={StarIcon} style={styles.starIcon} />
            {vote_average.toFixed(1)}
          </Text>
        </View>
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
