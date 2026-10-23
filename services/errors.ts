import { isAxiosError } from "axios";

export enum HttpStatus {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const STATUS_MESSAGES: Partial<Record<number, string>> = {
  [HttpStatus.Unauthorized]:
    "TMDB rejected the API key. Check EXPO_PUBLIC_TMDB_API_KEY.",
  [HttpStatus.Forbidden]: "You don't have permission to access this resource.",
  [HttpStatus.NotFound]: "Resource not found.",
  [HttpStatus.TooManyRequests]: "Too many requests. Please try again shortly.",
  [HttpStatus.InternalServerError]: "TMDB is having trouble. Try again later.",
};

/** Maps any thrown value (Axios or otherwise) to a user-facing message. */
export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return "Network error. Check your internet connection.";
    }
    return (
      STATUS_MESSAGES[error.response.status] ??
      `Request failed with status ${error.response.status}.`
    );
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Something went wrong.";
}
