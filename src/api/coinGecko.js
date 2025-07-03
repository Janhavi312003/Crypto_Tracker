// CoinGecko API service
const BASE_URL = "https://api.coingecko.com/api/v3"

export const coinGeckoAPI = {
  // Get market data for specific coins
  getCoinsMarket: async (coinIds) => {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching coin market data:", error)
      throw error
    }
  },

  // Get trending coins
  getTrendingCoins: async () => {
    try {
      const response = await fetch(`${BASE_URL}/search/trending`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching trending coins:", error)
      throw error
    }
  },

  // Get coin details
  getCoinDetails: async (coinId) => {
    try {
      const response = await fetch(`${BASE_URL}/coins/${coinId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching coin details:", error)
      throw error
    }
  },

  // Get price history
  getCoinHistory: async (coinId, days = 7) => {
    try {
      const response = await fetch(`${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching coin history:", error)
      throw error
    }
  },
}
