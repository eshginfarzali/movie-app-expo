import { getImageUrl } from "@/services/image";

describe("getImageUrl", () => {
  it("builds a TMDB URL with the default w500 size", () => {
    expect(getImageUrl("/abc.jpg")).toBe(
      "https://image.tmdb.org/t/p/w500/abc.jpg"
    );
  });

  it("uses the requested size and tolerates a missing leading slash", () => {
    expect(getImageUrl("abc.jpg", "w185")).toBe(
      "https://image.tmdb.org/t/p/w185/abc.jpg"
    );
  });

  it.each([null, undefined, ""])(
    "returns undefined when TMDB has no image (%p)",
    (path) => {
      expect(getImageUrl(path)).toBeUndefined();
    }
  );
});
