"use client"

import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { LandingPage } from "@/pages/LandingPage"
import { PortfolioPage } from "@/pages/PortfolioPage"
import { ProfileDialog } from "@/components/ProfileDialog"
// import "./App.css";
import "./index.css";


// Default user profile
const defaultProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Portfolio Manager",
  bio: "Cryptocurrency enthusiast and portfolio manager with 5+ years of experience in digital assets.",
  location: "San Francisco, CA",
  website: "https://johndoe.com",
  avatarStyle: "adventurer",
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [userProfile, setUserProfile] = useState(defaultProfile)
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("cryptoPortfolioProfile")
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  const handleGetStarted = () => {
    setCurrentPage("portfolio")
  }

  const handleBackToHome = () => {
    setCurrentPage("landing")
  }

  const handleEditProfile = () => {
    setProfileDialogOpen(true)
  }

  const handleSaveProfile = (newProfile) => {
    setUserProfile(newProfile)
    localStorage.setItem("cryptoPortfolioProfile", JSON.stringify(newProfile))
  }

  return (
    <>
      {currentPage === "landing" ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <PortfolioPage onBackToHome={handleBackToHome} userProfile={userProfile} onEditProfile={handleEditProfile} />
      )}

      <ProfileDialog
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        userProfile={userProfile}
        onSave={handleSaveProfile}
      />

      <Toaster position="top-right" />
    </>
  )
}
