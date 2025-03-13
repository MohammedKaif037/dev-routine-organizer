"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Code, Award } from "lucide-react"

export function HabitStats() {
  const stats = [
    {
      title: "Coding Time",
      value: "12h 30m",
      description: "This week",
      icon: Clock,
      change: "+2.5h",
      trend: "up",
    },
    {
      title: "Longest Streak",
      value: "14",
      description: "days",
      icon: Calendar,
      change: "+7",
      trend: "up",
    },
    {
      title: "Habits Completed",
      value: "8/12",
      description: "This week",
      icon: Code,
      change: "+3",
      trend: "up",
    },
    {
      title: "Achievement Points",
      value: "225",
      description: "Total",
      icon: Award,
      change: "+75",
      trend: "up",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <div className={`mt-1 text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {stat.change} from last week
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

