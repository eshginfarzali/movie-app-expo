import Rating from "@/components/ui/rating";
import { Colors } from "@/constants/Colors";
import { MovieCardProps } from "@/type/inderface";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const MovieSearchCard: React.FC<MovieCardProps> = ({
  id,
  title,
  vote_average,
  poster_path,
}) => {
  return (
    <Link
      href={{
        pathname: "/movie/[id]",
        params: { id: id },
      }}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://image.tmdb.org/t/p/w500/" + poster_path }}
          style={styles.image}
        />
      </View>
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.genre}>Action</Text>
        <Rating vote_average={vote_average} style={styles.rating} />
      </View>
    </Link>
  );
};

export default MovieSearchCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.card_background,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    overflow: "hidden",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 130,
  },
  imageContainer: {
    height: 130,
    width: 88,
  },
  image: {
    width: 88,
    height: 150,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    color: Colors.text,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  genre: {
    marginTop: 5,
    color: Colors.secendaryText,
  },
  rating: {
    marginTop: 10,
  },
});
