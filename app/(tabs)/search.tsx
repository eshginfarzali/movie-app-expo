import MovieSearchCard from "@/components/ui/movie-search-card";
import SearchInput from "@/components/ui/search-input";
import { Colors } from "@/constants/Colors";
import { useDebounce } from "@/hooks/useDebounce";
import { getSearchMovies } from "@/services/movie";
import { MovieCardProps } from "@/type/inderface";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text } from "react-native";

const Search = () => {
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debounceQuery.length >= 3) {
      fetchSearchResults(debounceQuery);
    } else if (debounceQuery.length === 0) {
      setResults([]);
    }
  }, [debounceQuery]);

  const fetchSearchResults = async (searchTerm: string) => {
    try {
      const response = await getSearchMovies(searchTerm);
      setResults(response?.data?.results ?? []);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch search results.");
    }
  };

  const renderMovieCard = ({ item }: { item: MovieCardProps }) => (
    <MovieSearchCard
      id={item.id}
      title={item.title}
      poster_path={item.poster_path}
      vote_average={item.vote_average}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput query={query} setQuery={setQuery} />
      <FlatList
        data={results}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No results found</Text>
        }
        contentContainerStyle={styles.resultsContainer}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  resultsContainer: {
    paddingVertical: 16,
  },
  noResultsText: {
    color: Colors.text,
    textAlign: "center",
    marginTop: 16,
  },
});
