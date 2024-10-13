import axiosClient from "@/services";

export const getPopularMovies = () => axiosClient.get("/3/movie/popular");

export const getUpcomingMovies = () => axiosClient.get("/3/movie/upcoming");

export const getSearchMovies = (search: string) =>
  axiosClient.get(`/3/search/movie`, {
    params: { query: search },
  });

export const getNowPlayingMovies = () =>
  axiosClient.get("/3/movie/now_playing");

export const getMovieById = (id: string) => axiosClient.get(`/3/movie/${id}`);

export const getMovieCasts = (id: string) =>
  axiosClient.get(`/3/movie/${id}/credits`);
