import axiosClient from "@/services";
import type {
  GenreListResponse,
  Movie,
  MovieCredits,
  MovieDetails,
  PaginatedResponse,
} from "@/services/types";

const get = async <T>(url: string, params?: Record<string, unknown>) => {
  const { data } = await axiosClient.get<T>(url, { params });
  return data;
};

export const getPopularMovies = () =>
  get<PaginatedResponse<Movie>>("/movie/popular");

export const getUpcomingMovies = () =>
  get<PaginatedResponse<Movie>>("/movie/upcoming");

export const getNowPlayingMovies = () =>
  get<PaginatedResponse<Movie>>("/movie/now_playing");

export const getSearchMovies = (query: string) =>
  get<PaginatedResponse<Movie>>("/search/movie", { query });

export const getMovieById = (id: string) =>
  get<MovieDetails>(`/movie/${encodeURIComponent(id)}`);

export const getMovieCasts = (id: string) =>
  get<MovieCredits>(`/movie/${encodeURIComponent(id)}/credits`);

export const getMovieGenres = () => get<GenreListResponse>("/genre/movie/list");
