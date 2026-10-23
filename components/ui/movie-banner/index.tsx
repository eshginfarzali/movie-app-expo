import { getImageUrl } from "@/services/image";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const MovieBanner = ({
  poster_path,
  id,
}: {
  poster_path: string | null;
  id: number;
}) => {
  return (
    <Link
      href={{
        pathname: "/movie/[id]",
        params: { id: id },
      }}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: getImageUrl(poster_path) }}
          style={{ width: 269, height: 404 }}
        />
      </View>
    </Link>
  );
};

export default MovieBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 269,
    height: 404,
    borderRadius: 8,
    marginRight: 10,
    overflow: "hidden",
  },
});
