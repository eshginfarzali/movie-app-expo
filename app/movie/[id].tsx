import ActorCard from "@/components/ui/actor-card";
import ErrorState from "@/components/ui/error-state";
import Header from "@/components/ui/header";
import Rating from "@/components/ui/rating";
import Title from "@/components/ui/title";
import { Colors } from "@/constants/Colors";
import { useMovieCredits, useMovieDetails } from "@/hooks/queries/movies";
import { getErrorMessage } from "@/services/errors";
import { getImageUrl } from "@/services/image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const details = useMovieDetails(id);
  const credits = useMovieCredits(id);

  if (details.isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="small" color={Colors.secendaryText} />
      </SafeAreaView>
    );
  }

  if (details.isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="" />
        <ErrorState
          message={getErrorMessage(details.error)}
          onRetry={details.refetch}
        />
      </SafeAreaView>
    );
  }

  const movie = details.data;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={movie.title} />

      <ScrollView>
        <View>
          <Image
            source={{ uri: getImageUrl(movie.poster_path) }}
            style={styles.poster}
          />
          <View style={styles.titleContainer}>
            <Title style={styles.title} title={movie.title} />
            <Rating vote_average={movie.vote_average} />
          </View>
          {movie.genres.length > 0 ? (
            <Text style={styles.genres}>
              {movie.genres.map((genre) => genre.name).join(" · ")}
            </Text>
          ) : null}
        </View>
        <View style={styles.details}>
          <Title title="Overview" />
          <Text style={styles.description}>{movie.overview}</Text>
        </View>
        <Title title="Cast" style={styles.castTitle} />
        {credits.isError ? (
          <ErrorState
            message={getErrorMessage(credits.error)}
            onRetry={credits.refetch}
          />
        ) : (
          <FlatList
            data={credits.data ?? []}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ActorCard profile_path={item.profile_path} name={item.name} />
            )}
          />
        )}
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
    flexShrink: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 10,
  },
  genres: {
    color: Colors.genre,
    fontSize: 14,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: Colors.secendaryText,
  },
  castTitle: {
    marginTop: 40,
  },
});
