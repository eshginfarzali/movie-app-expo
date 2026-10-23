/** Subset of the TMDB v3 response shapes that the app actually reads. */

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Omit<Movie, "genre_ids"> {
  genres: Genre[];
  runtime: number | null;
  tagline: string | null;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GenreListResponse {
  genres: Genre[];
}
