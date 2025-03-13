"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Code, BookOpen, Brain, Coffee, Target, Trophy } from "lucide-react"

type ActivityItem = {
  id: string
  type: string
  title: string
  timestamp: string
  duration?: number
  icon: string
  details?: string
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "coding",
    title: "Worked on React project",
    timestamp: "2025-03-13T09:30:00",
    duration: 75,
    icon: "code",
    details: "Implemented new features and fixed bugs in the dashboard component.",
  },
  {
    id: "2",
    type: "reading",
    title: "Read Next.js documentation",
    timestamp: "2025-03-12T14:15:00",
    duration: 45,
    icon: "book",
    details: "Studied server components and data fetching strategies.",
  },
  {
    id: "3",
    type: "problem",
    title: "Solved 3 algorithm challenges",
    timestamp: "2025-03-11T19:45:00",
    duration: 60,
    icon: "brain",
    details: "Completed challenges on binary trees, dynamic programming, and graph traversal.",
  },
  {
    id: "4",
    type: "break",
    title: "Took coding breaks",
    timestamp: "2025-03-13T11:00:00",
    duration: 15,
    icon: "coffee",
  },
  {
    id: "5",
    type: "goal",
    title: "Completed 'Learn TypeScript' goal",
    timestamp: "2025-03-10T16:20:00",
    icon: "target",
    details: "Finished all planned steps for learning TypeScript fundamentals.",
  },
  {
    id: "6",
    type: "achievement",
    title: "Earned 'Code Streak' achievement",
    timestamp: "2025-03-10T23:59:00",
    icon: "trophy",
    details: "Coded for 7 consecutive days.",
  },
  {
    id: "7",
    type: "coding",
    title: "Worked on portfolio website",
    timestamp: "2025-03-09T10:15:00",
    duration: 120,
    icon: "code",
    details: "Designed and implemented the projects section with filtering capabilities.",
  },
  {
    id: "8",
    type: "reading",
    title: "Studied CSS Grid and Flexbox",
    timestamp: "2025-03-08T15:30:00",
    duration: 60,
    icon: "book",
    details: "Learned advanced layout techniques and responsive design patterns.",
  },
]

export function ProfileActivity() {
  const [activeTab, setActiveTab] = useState("all")

  const getFilteredActivities = () => {
    if (activeTab === "all") return mockActivities
    return mockActivities.filter((a) => a.type === activeTab)
  }

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
      case "target":
        return <Target className="h-4 w-4" />
      case "trophy":
        return <Trophy className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case "coding":
        return "Coding Session"
      case "reading":
        return "Learning"
      case "problem":
        return "Problem Solving"
      case "break":
        return "Break"
      case "goal":
        return "Goal Completion"
      case "achievement":
        return "Achievement"
      default:
        return "Activity"
    }
  }

  const getActivityTypeBadge = (type: string) => {
    switch (type) {
      case "coding":
        return "bg-blue-500 hover:bg-blue-500"
      case "reading":
        return "bg-green-500 hover:bg-green-500"
      case "problem":
        return "bg-purple-500 hover:bg-purple-500"
      case "break":
        return "bg-orange-500 hover:bg-orange-500"
      case "goal":
        return "bg-teal-500 hover:bg-teal-500"
      case "achievement":
        return "bg-yellow-500 hover:bg-yellow-500"
      default:
        return "bg-gray-500 hover:bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
          <TabsTrigger value="reading">Learning</TabsTrigger>
          <TabsTrigger value="problem">Problem Solving</TabsTrigger>
          <TabsTrigger value="goal">Goals</TabsTrigger>
          <TabsTrigger value="achievement">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Your recent coding activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {getFilteredActivities().map((activity, index) => (
                  <div key={activity.id} className="relative pl-6">
                    {index < getFilteredActivities().length - 1 && (
                      <div className="absolute top-6 bottom-0 left-3 w-px bg-border" />
                    )}
                    <div className="absolute top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {getIconComponent(activity.icon)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.title}</span>
                        <Badge className={getActivityTypeBadge(activity.type)}>
                          {getActivityTypeLabel(activity.type)}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(activity.timestamp)}
                        {activity.duration && <span className="ml-2">• {activity.duration} min</span>}
                      </div>
                      {activity.details && <p className="text-sm mt-1">{activity.details}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

