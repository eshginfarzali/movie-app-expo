import ActorCard from "@/components/ui/actor-card";
import Title from "@/components/ui/title";
import { Colors } from "@/constants/Colors";
import { getMovieById, getMovieCasts } from "@/services/movie";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams();
  console.log({ id });

  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [cast, setCast] = useState<any>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieById(id);
        const castResponse = await getMovieCasts(id);

        console.log({ castResponse });
        setCast(castResponse?.data?.cast ?? []);

        setMovieDetails(response?.data ?? {});
      } catch (error) {
        Alert.alert("Error", "Failed to fetch search results.");
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);
  console.log(JSON.stringify(cast, null, 2));
  if (!movieDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="small" color={Colors.secendaryText} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`,
          }}
          style={styles.poster}
        />
        <Text style={styles.title}>{movieDetails.title}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.description}>{movieDetails.overview}</Text>
      </View>
      <Title title="Cast" />
      <FlatList
        data={cast}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ActorCard profile_path={item.profile_path} name={item.name} />
        )}
      />
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  poster: {
    width: "100%",
    // flex: 1,
    height: 233,
    // borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 10,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: Colors.secendaryText,
  },
});
