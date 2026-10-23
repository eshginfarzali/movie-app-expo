import ErrorState from "@/components/ui/error-state";
import MovieSearchCard from "@/components/ui/movie-search-card";
import SearchInput from "@/components/ui/search-input";
import { Colors } from "@/constants/Colors";
import {
  MIN_SEARCH_LENGTH,
  useGenreMap,
  useSearchMovies,
} from "@/hooks/queries/movies";
import { useDebounce } from "@/hooks/useDebounce";
import { getErrorMessage } from "@/services/errors";
import type { Movie } from "@/services/types";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 500);
  const isQueryTooShort = debounceQuery.trim().length < MIN_SEARCH_LENGTH;
  const { data, isFetching, isError, error, refetch } =
    useSearchMovies(debounceQuery);
  const genres = useGenreMap();
  const results = isQueryTooShort ? [] : (data ?? []);

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <MovieSearchCard
      id={item.id}
      title={item.title}
      poster_path={item.poster_path}
      vote_average={item.vote_average}
      genre={genres.get(item.genre_ids[0])}
    />
  );

  const renderEmpty = () => {
    if (isQueryTooShort) {
      return (
        <Text style={styles.noResultsText}>
          Type at least {MIN_SEARCH_LENGTH} characters to search
        </Text>
      );
    }
    if (isError) {
      return <ErrorState message={getErrorMessage(error)} onRetry={refetch} />;
    }
    if (isFetching) {
      return <ActivityIndicator color={Colors.secendaryText} />;
    }
    return <Text style={styles.noResultsText}>No results found</Text>;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <SearchInput query={query} setQuery={setQuery} />
      <FlatList
        data={results}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.resultsContainer}
        keyboardShouldPersistTaps="handled"
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
