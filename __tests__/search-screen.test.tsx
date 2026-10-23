import Search from "@/app/(tabs)/search";
import { getMovieGenres, getSearchMovies } from "@/services/movie";
import type { Movie, PaginatedResponse } from "@/services/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import type { ReactNode } from "react";

jest.mock("@/services/movie");
// The icon font is loaded through the native asset registry, which Jest lacks.
jest.mock("@/components/navigation/TabBarIcon", () => ({
  TabBarIcon: () => null,
}));
jest.mock("expo-router", () => ({
  Link: ({ children }: { children: ReactNode }) => children,
}));

const mockedSearch = jest.mocked(getSearchMovies);
const mockedGenres = jest.mocked(getMovieGenres);

const movie = (overrides: Partial<Movie>): Movie => ({
  id: 1,
  title: "Untitled",
  overview: "",
  poster_path: null,
  backdrop_path: null,
  vote_average: 0,
  release_date: "",
  genre_ids: [],
  ...overrides,
});

const page = (results: Movie[]): PaginatedResponse<Movie> => ({
  page: 1,
  results,
  total_pages: 1,
  total_results: results.length,
});

const renderScreen = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
  return render(
    <QueryClientProvider client={client}>
      <Search />
    </QueryClientProvider>
  );
};

describe("Search screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGenres.mockResolvedValue({ genres: [{ id: 28, name: "Action" }] });
  });

  it("asks for more input and does not call the API for short queries", async () => {
    const user = userEvent.setup();
    await renderScreen();

    await user.type(screen.getByPlaceholderText("Search movies..."), "ab");

    expect(
      await screen.findByText("Type at least 3 characters to search")
    ).toBeOnTheScreen();
    expect(mockedSearch).not.toHaveBeenCalled();
  });

  it("renders results with genre names from TMDB", async () => {
    mockedSearch.mockResolvedValue(
      page([movie({ id: 603, title: "The Matrix", genre_ids: [28] })])
    );
    const user = userEvent.setup();
    await renderScreen();

    await user.type(screen.getByPlaceholderText("Search movies..."), "matrix");

    expect(await screen.findByText("The Matrix")).toBeOnTheScreen();
    expect(await screen.findByText("Action")).toBeOnTheScreen();
    expect(mockedSearch).toHaveBeenLastCalledWith("matrix");
  });

  it("shows an error with a retry button when the request fails", async () => {
    mockedSearch.mockRejectedValueOnce(new Error("TMDB is down"));
    const user = userEvent.setup();
    await renderScreen();

    await user.type(screen.getByPlaceholderText("Search movies..."), "matrix");

    expect(await screen.findByText("TMDB is down")).toBeOnTheScreen();

    mockedSearch.mockResolvedValueOnce(page([movie({ title: "The Matrix" })]));
    await user.press(screen.getByRole("button", { name: "Try again" }));

    await waitFor(() =>
      expect(screen.getByText("The Matrix")).toBeOnTheScreen()
    );
  });
});
