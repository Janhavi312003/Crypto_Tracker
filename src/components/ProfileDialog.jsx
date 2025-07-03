"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Shuffle } from "lucide-react"
import { generateCartoonAvatar, getRandomCartoonStyle } from "@/utils/avatarGenerator"
import { motion } from "framer-motion"

export function ProfileDialog({ open, onOpenChange, userProfile, onSave }) {
  const [formData, setFormData] = useState(userProfile)

  useEffect(() => {
    setFormData(userProfile)
  }, [userProfile])

  const handleSave = () => {
    onSave(formData)
    onOpenChange(false)
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleRandomizeAvatar = () => {
    const newStyle = getRandomCartoonStyle()
    setFormData({ ...formData, avatarStyle: newStyle })
  }

  const avatarUrl = generateCartoonAvatar(formData.name, formData.avatarStyle || "adventurer")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Avatar Section */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={formData.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg">
                    {getInitials(formData.name)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  onClick={handleRandomizeAvatar}
                >
                  <Shuffle className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Portfolio Manager">Portfolio Manager</SelectItem>
                <SelectItem value="Investor">Investor</SelectItem>
                <SelectItem value="Trader">Trader</SelectItem>
                <SelectItem value="Analyst">Analyst</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="col-span-3"
              placeholder="e.g., New York, USA"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">
              Website
            </Label>
            <Input
              id="website"
              value={formData.website || ""}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="col-span-3"
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio || ""}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="col-span-3"
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
