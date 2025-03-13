"use client"

import { Activity, Code, BookOpen, Brain, Coffee } from "lucide-react"

type ActivityItem = {
  id: string
  type: string
  title: string
  timestamp: string
  duration?: number
  icon: string
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "coding",
    title: "Worked on React project",
    timestamp: "2025-03-13T09:30:00",
    duration: 75,
    icon: "code",
  },
  {
    id: "2",
    type: "reading",
    title: "Read Next.js documentation",
    timestamp: "2025-03-12T14:15:00",
    duration: 45,
    icon: "book",
  },
  {
    id: "3",
    type: "problem",
    title: "Solved 3 algorithm challenges",
    timestamp: "2025-03-11T19:45:00",
    duration: 60,
    icon: "brain",
  },
  {
    id: "4",
    type: "break",
    title: "Took coding breaks",
    timestamp: "2025-03-13T11:00:00",
    duration: 15,
    icon: "coffee",
  },
]

export function RecentActivity() {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="h-4 w-4" />
      case "book":
        return <BookOpen className="h-4 w-4" />
      case "brain":
        return <Brain className="h-4 w-4" />
      case "coffee":
        return <Coffee className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hr ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`
    }
  }

  return (
    <div className="space-y-4">
      {mockActivities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            {getIconComponent(activity.icon)}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{formatTimeAgo(activity.timestamp)}</span>
              {activity.duration && (
                <>
                  <span className="mx-1">•</span>
                  <span>{activity.duration} min</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

