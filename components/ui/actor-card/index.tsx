import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ActorCard = ({
  profile_path,
  name,
}: {
  profile_path: string;
  name: string;
}) => {
  return (
    <View style={styles.actorCard}>
      <Image
        source={{ uri: "https://image.tmdb.org/t/p/w500/" + profile_path }}
        style={styles.actorImage}
      />
      <Text numberOfLines={1} style={styles.actorName}>
        {name}
      </Text>
    </View>
  );
};

export default ActorCard;

const styles = StyleSheet.create({
  actorCard: {
    width: 141,
    height: 170,
    marginRight: 10,
    backgroundColor: Colors.card_background,
    borderRadius: 8,
    overflow: "hidden",
  },
  actorImage: {
    width: 141,
    height: 126,
  },
  actorName: {
    color: Colors.text,
    fontSize: 14,
    marginTop: 10,
    paddingLeft: 5,
  },
});
