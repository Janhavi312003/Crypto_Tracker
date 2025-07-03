"use client"

import toast from "react-hot-toast"

export function useToast() {
  return {
    toast: (options) => {
      if (options.variant === "destructive") {
        toast.error(options.description, { duration: 4000 })
      } else {
        toast.success(options.description, { duration: 4000 })
      }
    },
  }
}
