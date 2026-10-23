import { getErrorMessage, HttpStatus } from "@/services/errors";
import { AxiosError, AxiosHeaders, type AxiosResponse } from "axios";

const axiosErrorWithStatus = (status: number) => {
  const config = { headers: new AxiosHeaders() };
  const response: AxiosResponse = {
    status,
    statusText: "",
    data: {},
    headers: {},
    config,
  };
  return new AxiosError(
    "Request failed",
    "ERR_BAD_REQUEST",
    config,
    {},
    response
  );
};

describe("getErrorMessage", () => {
  it("explains an invalid API key on 401", () => {
    expect(
      getErrorMessage(axiosErrorWithStatus(HttpStatus.Unauthorized))
    ).toMatch(/EXPO_PUBLIC_TMDB_API_KEY/);
  });

  it("maps known statuses to friendly messages", () => {
    expect(getErrorMessage(axiosErrorWithStatus(HttpStatus.NotFound))).toBe(
      "Resource not found."
    );
  });

  it("falls back to the status code for unmapped statuses", () => {
    expect(getErrorMessage(axiosErrorWithStatus(418))).toBe(
      "Request failed with status 418."
    );
  });

  it("reports network errors when there is no response", () => {
    expect(getErrorMessage(new AxiosError("Network Error"))).toMatch(
      /Network error/
    );
  });

  it("handles plain errors and unknown values", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom");
    expect(getErrorMessage("nope")).toBe("Something went wrong.");
  });
});
