import Rating from "@/components/ui/rating";
import { render, screen } from "@testing-library/react-native";

describe("Rating", () => {
  it("shows the vote average with one decimal place", async () => {
    await render(<Rating vote_average={7.456} />);
    expect(screen.getByText("7.5")).toBeOnTheScreen();
  });
});
