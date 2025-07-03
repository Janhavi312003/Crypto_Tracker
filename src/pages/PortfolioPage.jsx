"use client"

import { useState, useEffect } from "react"
import { RefreshCw, TrendingUp, TrendingDown, DollarSign, Star, Activity, PieChart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { useToast } from "@/hooks/useToast"
import { Navbar } from "@/components/Navbar"
import { motion } from "framer-motion"
import { coinGeckoAPI, handleAPIError } from "@/api"

// Sample portfolio data - you can modify this
const samplePortfolio = [
  { coinId: "bitcoin", quantity: 0.5 },
  { coinId: "ethereum", quantity: 2.3 },
  { coinId: "cardano", quantity: 1000 },
  { coinId: "polkadot", quantity: 50 },
  { coinId: "chainlink", quantity: 25 },
  { coinId: "solana", quantity: 10 },
]

export function PortfolioPage({ onBackToHome, userProfile, onEditProfile }) {
  const [portfolio, setPortfolio] = useState(samplePortfolio)
  const [coinData, setCoinData] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const { toast } = useToast()

  const fetchCoinData = async () => {
    try {
      setLoading(true)
      const coinIds = portfolio.map((item) => item.coinId).join(",")

      const data = await coinGeckoAPI.getCoinsMarket(coinIds)
      setCoinData(data)
      setLastUpdated(new Date())

      toast({
        title: "Portfolio Updated",
        description: "Live prices have been refreshed successfully.",
      })
    } catch (error) {
      const friendlyError = handleAPIError(error, "Fetching coin data")
      console.error("Error fetching coin data:", error)
      toast({
        title: "Error",
        description: friendlyError.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoinData()

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchCoinData, 60000)
    return () => clearInterval(interval)
  }, [portfolio])

  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, item) => {
      const coin = coinData.find((c) => c.id === item.coinId)
      return total + (coin ? coin.current_price * item.quantity : 0)
    }, 0)
  }

  const calculateTotalChange = () => {
    const totalValue = calculatePortfolioValue()
    const totalChange = portfolio.reduce((total, item) => {
      const coin = coinData.find((c) => c.id === item.coinId)
      if (coin) {
        const currentValue = coin.current_price * item.quantity
        const previousValue = currentValue / (1 + coin.price_change_percentage_24h / 100)
        return total + (currentValue - previousValue)
      }
      return total
    }, 0)

    return {
      amount: totalChange,
      percentage: totalValue > 0 ? (totalChange / (totalValue - totalChange)) * 100 : 0,
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatPercentage = (percentage) => {
    return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`
  }

  const totalValue = calculatePortfolioValue()
  const totalChange = calculateTotalChange()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar
        onBackToHome={onBackToHome}
        showBackButton={true}
        userProfile={userProfile}
        onEditProfile={onEditProfile}
      />

      <motion.div
        className="container mx-auto px-4 py-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-2xl font-bold"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome back, {userProfile.name}!
              </motion.h1>
              <motion.p className="opacity-90" initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.3 }}>
                Here's your portfolio overview for today
              </motion.p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm opacity-90">Last Updated</div>
                <div className="font-semibold">{lastUpdated ? lastUpdated.toLocaleTimeString() : "Never"}</div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={fetchCoinData}
                  disabled={loading}
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Summary Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-32 bg-white/20" /> : formatCurrency(totalValue)}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">24h Change</CardTitle>
                {totalChange.percentage >= 0 ? (
                  <TrendingUp className="h-4 w-4 opacity-90" />
                ) : (
                  <TrendingDown className="h-4 w-4 opacity-90" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? (
                    <Skeleton className="h-8 w-24 bg-white/20" />
                  ) : (
                    <>
                      {formatCurrency(totalChange.amount)}
                      <div className="text-sm font-normal opacity-90">{formatPercentage(totalChange.percentage)}</div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Holdings</CardTitle>
                <PieChart className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolio.length}</div>
                <p className="text-sm opacity-90">Different Coins</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Best Performer</CardTitle>
                <Star className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? (
                    <Skeleton className="h-8 w-16 bg-white/20" />
                  ) : (
                    coinData.length > 0 &&
                    coinData
                      .reduce((best, coin) =>
                        coin.price_change_percentage_24h > best.price_change_percentage_24h ? coin : best,
                      )
                      .symbol.toUpperCase()
                  )}
                </div>
                <p className="text-sm opacity-90">
                  {!loading &&
                    coinData.length > 0 &&
                    formatPercentage(
                      coinData.reduce((best, coin) =>
                        coin.price_change_percentage_24h > best.price_change_percentage_24h ? coin : best,
                      ).price_change_percentage_24h,
                    )}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Portfolio Holdings */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Your Holdings
                  </CardTitle>
                  <CardDescription>Current cryptocurrency positions and their values</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {portfolio.length} Assets
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolio.map((item, index) => {
                  const coin = coinData.find((c) => c.id === item.coinId)
                  const value = coin ? coin.current_price * item.quantity : 0

                  return (
                    <motion.div
                      key={item.coinId}
                      className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors bg-gradient-to-r from-transparent to-blue-50/30 dark:to-blue-950/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          {loading ? (
                            <Skeleton className="h-12 w-12 rounded-full" />
                          ) : (
                            coin && (
                              <>
                                <img
                                  src={coin.image || "/placeholder.svg"}
                                  alt={coin.name}
                                  className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
                                />
                                <Badge
                                  variant="secondary"
                                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-blue-600 text-white"
                                >
                                  #{coin.market_cap_rank}
                                </Badge>
                              </>
                            )
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-lg">
                            {loading ? <Skeleton className="h-5 w-20" /> : coin?.name}
                          </div>
                          <div className="text-sm text-muted-foreground font-medium">
                            {loading ? <Skeleton className="h-4 w-16" /> : coin?.symbol.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Quantity</div>
                        <div className="font-semibold">{item.quantity.toLocaleString()}</div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Price</div>
                        <div className="font-semibold">
                          {loading ? <Skeleton className="h-5 w-16" /> : coin && formatCurrency(coin.current_price)}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">24h Change</div>
                        <div className="flex items-center justify-center space-x-1">
                          {loading ? (
                            <Skeleton className="h-6 w-16" />
                          ) : (
                            coin && (
                              <>
                                {coin.price_change_percentage_24h >= 0 ? (
                                  <TrendingUp className="h-3 w-3 text-green-600" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 text-red-600" />
                                )}
                                <Badge
                                  variant={coin.price_change_percentage_24h >= 0 ? "default" : "destructive"}
                                  className={`text-xs ${
                                    coin.price_change_percentage_24h >= 0
                                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                  }`}
                                >
                                  {formatPercentage(coin.price_change_percentage_24h)}
                                </Badge>
                              </>
                            )
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Value</div>
                        <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {loading ? <Skeleton className="h-6 w-20" /> : formatCurrency(value)}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center text-sm text-muted-foreground bg-card/30 backdrop-blur-sm rounded-lg p-4"
          variants={itemVariants}
        >
          <p>Data provided by CoinGecko API • Updates every 60 seconds</p>
          <p className="mt-1">
           @2025 <code className="bg-muted px-1 rounded">Crypto Tracker.</code>All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
