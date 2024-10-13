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
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieCardProps[]>(
    []
  );
  const [upcomingMovies, setUpcomingMovies] = useState<MovieCardProps[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieCardProps[]>([]);

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
        <FlatList
          data={nowPlayingMovies}
          renderItem={renderMovieBanner}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={styles.horizontalList}
        />
        <Title title="Popular Movies" />
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
