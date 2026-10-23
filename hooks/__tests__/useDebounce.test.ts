import { useDebounce } from "@/hooks/useDebounce";
import { act, renderHook } from "@testing-library/react-native";

describe("useDebounce", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("only emits the latest value after the delay", async () => {
    const { result, rerender } = await renderHook(
      ({ value }: { value: string }) => useDebounce(value, 500),
      { initialProps: { value: "a" } }
    );

    await rerender({ value: "ab" });
    await rerender({ value: "abc" });
    expect(result.current).toBe("a");

    await act(async () => {
      jest.advanceTimersByTime(499);
    });
    expect(result.current).toBe("a");

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe("abc");
  });
});
