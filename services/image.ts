const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export type ImageSize = "w185" | "w342" | "w500" | "original";

/** Builds a TMDB image URL, or returns undefined when TMDB has no image. */
export function getImageUrl(
  path: string | null | undefined,
  size: ImageSize = "w500"
): string | undefined {
  if (!path) return undefined;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${TMDB_IMAGE_BASE_URL}/${size}${normalized}`;
}
