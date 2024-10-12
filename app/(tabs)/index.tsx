import Logo from "@/assets/icons/logo.png";
import MovieBanner from "@/components/ui/movie-banner";
import MovieCard from "@/components/ui/movie-card";
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
  Text,
} from "react-native";

export default function HomeScreen() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const fetcResults = async () => {
    try {
      const responseNowPlaying = await getNowPlayingMovies();
      const responseUpComing = await getUpcomingMovies();
      const responsePopular = await getPopularMovies();
      setNowPlayingMovies(responseNowPlaying?.data?.results);
      setUpcomingMovies(responseUpComing?.data?.results);
      setPopularMovies(responsePopular?.data?.results);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch search results.");
    }
  };

  useEffect(() => {
    fetcResults();
  }, []);

  const renderNowPlayingCard = ({ item }: { item: any }) => (
    <MovieBanner poster_path={item.poster_path} id={item.id} />
  );
  const renderPopularUpcomingCard = ({ item }: { item: MovieCardProps }) => (
    <MovieCard
      id={item.id}
      title={item.title}
      vote_average={item.vote_average}
      poster_path={item.poster_path}
    />
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.background, padding: 16 }}
    >
      <Image source={Logo} style={styles.logo} />
      <ScrollView>
        <FlatList
          data={upcomingMovies}
          renderItem={renderNowPlayingCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={styles.horizontalList}
        />
        <Text style={styles.textTitle}>Popular Movies</Text>
        <FlatList
          data={popularMovies}
          renderItem={renderPopularUpcomingCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
        <Text style={styles.textTitle}>Upcoming Movies</Text>
        <FlatList
          data={upcomingMovies}
          renderItem={renderPopularUpcomingCard}
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
  logo: {
    width: 100,
    height: 30,
    resizeMode: "contain",
  },
  horizontalList: {
    paddingVertical: 10,
  },
  textTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
});
