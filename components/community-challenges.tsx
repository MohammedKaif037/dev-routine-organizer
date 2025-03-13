"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Calendar, Clock, Code, Users, ArrowRight, CheckCircle2 } from "lucide-react"

type Challenge = {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced" | "expert"
  category: string
  startDate: string
  endDate: string
  participants: number
  completions: number
  tags: string[]
  status: "active" | "upcoming" | "completed"
  userProgress?: number
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "30 Days of JavaScript",
    description: "Complete one JavaScript coding challenge every day for 30 days to improve your skills.",
    difficulty: "intermediate",
    category: "JavaScript",
    startDate: "2025-03-01T00:00:00",
    endDate: "2025-03-30T23:59:59",
    participants: 245,
    completions: 87,
    tags: ["javascript", "algorithms", "daily"],
    status: "active",
    userProgress: 45,
  },
  {
    id: "2",
    title: "Build a Full-Stack App in a Week",
    description: "Create a complete web application with frontend, backend, and database in just 7 days.",
    difficulty: "advanced",
    category: "Full-Stack",
    startDate: "2025-03-15T00:00:00",
    endDate: "2025-03-22T23:59:59",
    participants: 120,
    completions: 0,
    tags: ["react", "node.js", "mongodb", "project"],
    status: "upcoming",
  },
  {
    id: "3",
    title: "CSS Art Challenge",
    description: "Create beautiful artwork using only HTML and CSS. No JavaScript allowed!",
    difficulty: "intermediate",
    category: "CSS",
    startDate: "2025-03-05T00:00:00",
    endDate: "2025-03-12T23:59:59",
    participants: 180,
    completions: 65,
    tags: ["css", "html", "design", "creative"],
    status: "active",
    userProgress: 70,
  },
  {
    id: "4",
    title: "Optimize Your Code",
    description: "Take existing code and optimize it for performance, readability, and maintainability.",
    difficulty: "expert",
    category: "Performance",
    startDate: "2025-02-20T00:00:00",
    endDate: "2025-02-27T23:59:59",
    participants: 95,
    completions: 42,
    tags: ["optimization", "refactoring", "performance"],
    status: "completed",
    userProgress: 100,
  },
  {
    id: "5",
    title: "Learn TypeScript in 14 Days",
    description: "A structured challenge to learn TypeScript fundamentals through daily exercises.",
    difficulty: "beginner",
    category: "TypeScript",
    startDate: "2025-03-20T00:00:00",
    endDate: "2025-04-03T23:59:59",
    participants: 310,
    completions: 0,
    tags: ["typescript", "learning", "beginner-friendly"],
    status: "upcoming",
  },
]

export function CommunityChallenges() {
  const [activeTab, setActiveTab] = useState("active")

  const getFilteredChallenges = () => {
    return mockChallenges.filter((challenge) => challenge.status === activeTab)
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return <Badge className="bg-green-500 hover:bg-green-500">Beginner</Badge>
      case "intermediate":
        return <Badge className="bg-blue-500 hover:bg-blue-500">Intermediate</Badge>
      case "advanced":
        return <Badge className="bg-orange-500 hover:bg-orange-500">Advanced</Badge>
      case "expert":
        return <Badge className="bg-red-500 hover:bg-red-500">Expert</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Coding Challenges</CardTitle>
          <CardDescription>Participate in challenges to improve your skills and earn achievements</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">
                  <Code className="mr-2 h-4 w-4" />
                  Active
                </TabsTrigger>
                <TabsTrigger value="upcoming">
                  <Calendar className="mr-2 h-4 w-4" />
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="completed">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Completed
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="divide-y">
                {getFilteredChallenges().map((challenge) => (
                  <div key={challenge.id} className="p-6 hover:bg-muted/50">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{challenge.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {getDifficultyBadge(challenge.difficulty)}
                            <Badge variant="outline">{challenge.category}</Badge>
                          </div>
                        </div>
                        {challenge.status === "active" && challenge.userProgress !== undefined && (
                          <div className="text-right">
                            <div className="text-sm font-medium">{challenge.userProgress}% Complete</div>
                            <Progress value={challenge.userProgress} className="w-[100px] mt-1" />
                          </div>
                        )}
                      </div>

                      <p className="text-sm">{challenge.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>
                            {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                          </span>
                        </div>

                        {challenge.status === "active" && (
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{getDaysRemaining(challenge.endDate)} days remaining</span>
                          </div>
                        )}

                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{challenge.participants} participants</span>
                        </div>

                        {challenge.status === "completed" && (
                          <div className="flex items-center">
                            <Trophy className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{challenge.completions} completions</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {challenge.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="p-6">
          <Button className="w-full">
            {activeTab === "active"
              ? "Join Challenge"
              : activeTab === "upcoming"
                ? "Get Notified"
                : "View Past Challenges"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

