import axiosClient from "@/services";

export function getPopularMovies() {
  return axiosClient.get("/3/movie/popular");
}

export function getUpcomingMovies() {
  return axiosClient.get("/3/movie/upcoming");
}

export function getSearchMovies(search: string) {
  return axiosClient.get(`/3/search/movie`, {
    params: {
      query: search,
    },
  });
}

export function getNowPlayingMovies() {
  return axiosClient.get("/3/movie/now_playing");
}

export function getMovieById(id: string) {
  return axiosClient.get(`/3/movie/${id}`);
}
