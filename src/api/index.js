// Main API exports
export { coinGeckoAPI } from "./coinGecko.js"

// API configuration
export const API_CONFIG = {
  COINGECKO_BASE_URL: "https://api.coingecko.com/api/v3",
  REQUEST_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
}

// Generic API error handler
export const handleAPIError = (error, context = "API call") => {
  console.error(`${context} failed:`, error)

  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return new Error("Network error. Please check your internet connection.")
  }

  if (error.message.includes("HTTP error")) {
    return new Error("Server error. Please try again later.")
  }

  return new Error("Something went wrong. Please try again.")
}
