/**
 * A base class for all custom API errors to allow for common handling.
 */
export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message); // Pass message to the base Error class
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * A specific error for when the user has hit a rate limit.
 * Components can check for this error type and show a specific UI.
 */
export class RateLimitError extends ApiError {
  constructor(message: string) {
    // 429 is the standard HTTP status code for "Too Many Requests"
    super(message, 429); 
    this.name = 'RateLimitError';
  }
}