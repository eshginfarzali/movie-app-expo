import {
  getMovieById,
  getMovieCasts,
  getMovieGenres,
  getNowPlayingMovies,
  getPopularMovies,
  getSearchMovies,
  getUpcomingMovies,
} from "@/services/movie";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const MIN_SEARCH_LENGTH = 3;

export const movieKeys = {
  all: ["movies"] as const,
  list: (category: "now_playing" | "popular" | "upcoming") =>
    [...movieKeys.all, "list", category] as const,
  search: (query: string) => [...movieKeys.all, "search", query] as const,
  detail: (id: string) => [...movieKeys.all, "detail", id] as const,
  credits: (id: string) => [...movieKeys.all, "credits", id] as const,
  genres: () => [...movieKeys.all, "genres"] as const,
};

export const useNowPlayingMovies = () =>
  useQuery({
    queryKey: movieKeys.list("now_playing"),
    queryFn: getNowPlayingMovies,
    select: (data) => data.results,
  });

export const usePopularMovies = () =>
  useQuery({
    queryKey: movieKeys.list("popular"),
    queryFn: getPopularMovies,
    select: (data) => data.results,
  });

export const useUpcomingMovies = () =>
  useQuery({
    queryKey: movieKeys.list("upcoming"),
    queryFn: getUpcomingMovies,
    select: (data) => data.results,
  });

export const useSearchMovies = (query: string) => {
  const trimmed = query.trim();
  return useQuery({
    queryKey: movieKeys.search(trimmed),
    queryFn: () => getSearchMovies(trimmed),
    enabled: trimmed.length >= MIN_SEARCH_LENGTH,
    placeholderData: keepPreviousData,
    select: (data) => data.results,
  });
};

export const useMovieDetails = (id: string | undefined) =>
  useQuery({
    queryKey: movieKeys.detail(id ?? ""),
    queryFn: () => getMovieById(id as string),
    enabled: Boolean(id),
  });

export const useMovieCredits = (id: string | undefined) =>
  useQuery({
    queryKey: movieKeys.credits(id ?? ""),
    queryFn: () => getMovieCasts(id as string),
    enabled: Boolean(id),
    select: (data) => data.cast,
  });

/** Genre names rarely change, so the list is fetched once per session. */
export const useGenreMap = () => {
  const { data } = useQuery({
    queryKey: movieKeys.genres(),
    queryFn: getMovieGenres,
    staleTime: Infinity,
  });
  return useMemo(
    () => new Map((data?.genres ?? []).map((g) => [g.id, g.name])),
    [data]
  );
};
