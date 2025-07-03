"use client"

import { ArrowRight, BarChart3, Shield, Zap, Wallet, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { motion } from "framer-motion"

export function LandingPage({ onGetStarted }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-green-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="text-center space-y-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo and Title */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div className="flex justify-center" variants={floatingVariants} animate="animate">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
                <Wallet className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Crypto Portfolio Tracker
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto" variants={itemVariants}>
              Track your cryptocurrency investments with real-time prices and comprehensive portfolio analytics
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Tracking Now
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.p className="text-sm text-muted-foreground" variants={itemVariants}>
              No registration required • Free to use
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <motion.div
                  className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <BarChart3 className="h-8 w-8 text-white" />
                </motion.div>
                <CardTitle className="text-xl font-bold">Real-Time Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Get live cryptocurrency prices updated every minute with accurate market data from CoinGecko API
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <motion.div
                  className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Shield className="h-8 w-8 text-white" />
                </motion.div>
                <CardTitle className="text-xl font-bold">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Your portfolio data stays on your device. No registration, no data collection, complete privacy
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <motion.div
                  className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="h-8 w-8 text-white" />
                </motion.div>
                <CardTitle className="text-xl font-bold">Instant Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  View your total portfolio value, 24h changes, and individual coin performance at a glance
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </motion.div>
          <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
            <div className="text-3xl font-bold text-green-600 mb-2">$50M+</div>
            <div className="text-sm text-muted-foreground">Assets Tracked</div>
          </motion.div>
          <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Cryptocurrencies</div>
          </motion.div>
          <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Live Updates</div>
          </motion.div>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.h2 className="text-3xl font-bold mb-8" variants={itemVariants}>
            See Your Portfolio in Action
          </motion.h2>
          <motion.div
            className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl text-white"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-sm opacity-90 mb-2">Total Portfolio Value</div>
                <motion.div
                  className="text-2xl font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  $47,832.50
                </motion.div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-sm opacity-90 mb-2">24h Change</div>
                <motion.div
                  className="text-2xl font-bold flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                >
                  <TrendingUp className="h-5 w-5 mr-1" />
                  +$1,234.56
                </motion.div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-sm opacity-90 mb-2">Holdings</div>
                <motion.div
                  className="text-2xl font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  6 Coins
                </motion.div>
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onGetStarted}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-2 rounded-lg transition-all duration-300 bg-transparent"
              >
                Try It Now
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-20 text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p>Powered by CoinGecko API • Built with React & Vite</p>
        </motion.div>
      </div>
    </div>
  )
}
