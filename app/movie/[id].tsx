import ActorCard from "@/components/ui/actor-card";
import Header from "@/components/ui/header";
import Rating from "@/components/ui/rating";
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
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [cast, setCast] = useState<any>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieById(id as string);
        const castResponse = await getMovieCasts(id as string);
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
  if (!movieDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="small" color={Colors.secendaryText} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={movieDetails?.title} />

      <ScrollView>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`,
            }}
            style={styles.poster}
          />
          <View style={styles.titleContainer}>
            <Title style={styles.title} title={movieDetails?.title} />
            <Rating vote_average={movieDetails?.vote_average} />
          </View>
        </View>
        <View style={styles.details}>
          <Title title="Overview" />
          <Text style={styles.description}>{movieDetails?.overview}</Text>
        </View>
        <Title title="Cast" style={{ marginTop: 40 }} />
        <FlatList
          data={cast}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            <ActorCard profile_path={item?.profile_path} name={item?.name} />
          )}
        />
      </ScrollView>
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
  poster: {
    width: "100%",
    height: 333,
    resizeMode: "cover",
  },
  titleContainer: {
    flexDirection: "row",
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
