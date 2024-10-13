import Logo from "@/assets/icons/logo.png";
import MovieBanner from "@/components/ui/movie-banner";
import MovieCard from "@/components/ui/movie-card";
import Title from "@/components/ui/title";
import { Colors } from "@/constants/Colors";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
} from "@/services/movie";
import { MovieCardProps } from "@/type/inderface";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ExpandingDot } from "react-native-animated-pagination-dots";

export default function HomeScreen() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieCardProps[]>(
    []
  );
  const [upcomingMovies, setUpcomingMovies] = useState<MovieCardProps[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieCardProps[]>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const fetchResults = async () => {
    try {
      const [responseNowPlaying, responseUpcoming, responsePopular] =
        await Promise.all([
          getNowPlayingMovies(),
          getUpcomingMovies(),
          getPopularMovies(),
        ]);
      setNowPlayingMovies(responseNowPlaying?.data?.results ?? []);
      setUpcomingMovies(responseUpcoming?.data?.results ?? []);
      setPopularMovies(responsePopular?.data?.results ?? []);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch movie data.");
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const renderMovieBanner = ({ item }: { item: any }) => (
    <MovieBanner poster_path={item.poster_path} id={item.id} />
  );

  const renderMovieCard = ({ item }: { item: MovieCardProps }) => (
    <MovieCard
      id={item.id}
      title={item.title}
      vote_average={item.vote_average}
      poster_path={item.poster_path}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <ScrollView>
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
            dotStyle={{
              width: 10,
              height: 10,
              backgroundColor: Colors.purple,
              borderColor: Colors.purple,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            containerStyle={{
              top: 420,
              marginBottom: 10,
            }}
          />
        </View>
        <Title
          title="Popular Movies"
          style={{
            marginTop: 20,
          }}
        />
        <FlatList
          data={popularMovies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
        <Title title="Upcoming Movies" />
        <FlatList
          data={upcomingMovies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
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
});
