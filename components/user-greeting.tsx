"use client"

import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserGreeting() {
  const { user } = useAuth()

  if (!user) return null

  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 18) return "afternoon"
    return "evening"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={user.photoURL} alt={user.name} />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold">
          Good {getTimeOfDay()}, {user.name}
        </h1>
        <p className="text-muted-foreground">Track your coding habits and achieve your developer goals</p>
      </div>
    </div>
  )
}

