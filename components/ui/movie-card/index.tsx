import Rating from "@/components/ui/rating";
import { Colors } from "@/constants/Colors";
import { getImageUrl } from "@/services/image";
import { Link } from "expo-router";
import React from "react";

import { Image, StyleSheet, Text, View } from "react-native";

export interface MovieCardProps {
  id: number;
  title: string;
  vote_average: number;
  poster_path?: string | null;
  genre?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  poster_path,
  vote_average,
  title,
  id,
  genre,
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
          source={{ uri: getImageUrl(poster_path, "w342") }}
          style={styles.movieImage}
        />
        <Rating vote_average={vote_average} style={styles.movieRating} />
        <Text numberOfLines={1} style={styles.movieTitle}>
          {title}
        </Text>
        {genre ? <Text style={styles.movieGenre}>{genre}</Text> : null}
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
