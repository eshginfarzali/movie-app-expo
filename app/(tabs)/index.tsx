import Logo from "@/assets/icons/logo.png";
import ErrorState from "@/components/ui/error-state";
import MovieBanner from "@/components/ui/movie-banner";
import MovieCard from "@/components/ui/movie-card";
import Title from "@/components/ui/title";
import { Colors } from "@/constants/Colors";
import {
  useGenreMap,
  useNowPlayingMovies,
  usePopularMovies,
  useUpcomingMovies,
} from "@/hooks/queries/movies";
import { getErrorMessage } from "@/services/errors";
import type { Movie } from "@/services/types";
import type { UseQueryResult } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { SafeAreaView } from "react-native-safe-area-context";

type MovieListQuery = UseQueryResult<Movie[]>;

const QueryState = ({
  query,
  children,
}: {
  query: MovieListQuery;
  children: React.ReactNode;
}) => {
  if (query.isPending) {
    return (
      <ActivityIndicator style={styles.loader} color={Colors.secendaryText} />
    );
  }
  if (query.isError) {
    return (
      <ErrorState
        message={getErrorMessage(query.error)}
        onRetry={query.refetch}
      />
    );
  }
  return <>{children}</>;
};

export default function HomeScreen() {
  const nowPlaying = useNowPlayingMovies();
  const popular = usePopularMovies();
  const upcoming = useUpcomingMovies();
  const genres = useGenreMap();
  const [scrollX] = useState(() => new Animated.Value(0));

  const nowPlayingMovies = nowPlaying.data ?? [];

  const renderMovieBanner = ({ item }: { item: Movie }) => (
    <MovieBanner poster_path={item.poster_path} id={item.id} />
  );

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <MovieCard
      id={item.id}
      title={item.title}
      vote_average={item.vote_average}
      poster_path={item.poster_path}
      genre={genres.get(item.genre_ids[0])}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Image source={Logo} style={styles.logo} />
      <ScrollView>
        <QueryState query={nowPlaying}>
          <View>
            <FlatList
              data={nowPlayingMovies}
              renderItem={renderMovieBanner}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              contentContainerStyle={styles.horizontalList}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                }
              )}
              pagingEnabled
              decelerationRate={"normal"}
              scrollEventThrottle={16}
            />
            <ExpandingDot
              data={nowPlayingMovies}
              expandingDotWidth={30}
              scrollX={scrollX}
              inActiveDotOpacity={0.6}
              dotStyle={styles.dot}
              containerStyle={styles.dotContainer}
            />
          </View>
        </QueryState>
        <Title title="Popular Movies" style={styles.firstSectionTitle} />
        <QueryState query={popular}>
          <FlatList
            data={popular.data}
            renderItem={renderMovieCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </QueryState>
        <Title title="Upcoming Movies" />
        <QueryState query={upcoming}>
          <FlatList
            data={upcoming.data}
            renderItem={renderMovieCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </QueryState>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: "contain",
  },
  horizontalList: {
    paddingVertical: 10,
  },
  loader: {
    paddingVertical: 24,
  },
  firstSectionTitle: {
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: Colors.purple,
    borderColor: Colors.purple,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotContainer: {
    top: 420,
    marginBottom: 10,
  },
});
