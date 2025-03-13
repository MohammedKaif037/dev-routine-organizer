"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Star, Clock, Calendar, Target, Code, BookOpen, Brain } from "lucide-react"

type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  category: string
  dateEarned: string
  points: number
  level: "bronze" | "silver" | "gold" | "platinum"
  unlocked: boolean
  progress?: number
  total?: number
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Code Streak",
    description: "Code for 7 consecutive days",
    icon: "calendar",
    category: "Consistency",
    dateEarned: "2025-03-10",
    points: 50,
    level: "bronze",
    unlocked: true,
  },
  {
    id: "2",
    title: "Problem Solver",
    description: "Solve 10 coding challenges",
    icon: "brain",
    category: "Practice",
    dateEarned: "2025-03-05",
    points: 75,
    level: "silver",
    unlocked: true,
  },
  {
    id: "3",
    title: "Documentation Master",
    description: "Read documentation for 5 hours total",
    icon: "book",
    category: "Learning",
    dateEarned: "2025-03-01",
    points: 100,
    level: "gold",
    unlocked: true,
  },
  {
    id: "4",
    title: "Project Completer",
    description: "Complete a full-stack project",
    icon: "code",
    category: "Projects",
    dateEarned: "",
    points: 150,
    level: "platinum",
    unlocked: false,
    progress: 75,
    total: 100,
  },
  {
    id: "5",
    title: "Early Bird",
    description: "Code before 7 AM for 5 days",
    icon: "clock",
    category: "Consistency",
    dateEarned: "",
    points: 50,
    level: "bronze",
    unlocked: false,
    progress: 3,
    total: 5,
  },
  {
    id: "6",
    title: "Goal Achiever",
    description: "Complete 3 goals",
    icon: "target",
    category: "Goals",
    dateEarned: "",
    points: 75,
    level: "silver",
    unlocked: false,
    progress: 1,
    total: 3,
  },
  {
    id: "7",
    title: "Coding Marathon",
    description: "Code for 8 hours in a single day",
    icon: "code",
    category: "Dedication",
    dateEarned: "2025-02-15",
    points: 100,
    level: "gold",
    unlocked: true,
  },
  {
    id: "8",
    title: "Team Player",
    description: "Contribute to 5 community discussions",
    icon: "users",
    category: "Community",
    dateEarned: "",
    points: 50,
    level: "bronze",
    unlocked: false,
    progress: 2,
    total: 5,
  },
]

export function ProfileAchievements() {
  const [activeTab, setActiveTab] = useState("all")

  const getFilteredAchievements = () => {
    if (activeTab === "all") return mockAchievements
    if (activeTab === "unlocked") return mockAchievements.filter((a) => a.unlocked)
    if (activeTab === "locked") return mockAchievements.filter((a) => !a.unlocked)
    return mockAchievements.filter((a) => a.category.toLowerCase() === activeTab.toLowerCase())
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="h-5 w-5" />
      case "medal":
        return <Medal className="h-5 w-5" />
      case "award":
        return <Award className="h-5 w-5" />
      case "star":
        return <Star className="h-5 w-5" />
      case "clock":
        return <Clock className="h-5 w-5" />
      case "calendar":
        return <Calendar className="h-5 w-5" />
      case "target":
        return <Target className="h-5 w-5" />
      case "code":
        return <Code className="h-5 w-5" />
      case "book":
        return <BookOpen className="h-5 w-5" />
      case "brain":
        return <Brain className="h-5 w-5" />
      default:
        return <Trophy className="h-5 w-5" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "bronze":
        return "bg-amber-700 hover:bg-amber-700"
      case "silver":
        return "bg-slate-400 hover:bg-slate-400"
      case "gold":
        return "bg-yellow-500 hover:bg-yellow-500"
      case "platinum":
        return "bg-indigo-400 hover:bg-indigo-400"
      default:
        return ""
    }
  }

  const categories = [
    "all",
    "unlocked",
    "locked",
    "consistency",
    "practice",
    "learning",
    "projects",
    "goals",
    "dedication",
    "community",
  ]

  const totalPoints = mockAchievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0)
  const totalAchievements = mockAchievements.filter((a) => a.unlocked).length
  const totalPossible = mockAchievements.length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Points</CardTitle>
            <CardDescription>Your achievement score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPoints}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Achievements Earned</CardTitle>
            <CardDescription>Your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalAchievements}/{totalPossible}
            </div>
            <Progress value={(totalAchievements / totalPossible) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Next Achievement</CardTitle>
            <CardDescription>Almost there!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                {getIconComponent("code")}
              </div>
              <div>
                <div className="font-medium">Project Completer</div>
                <Progress value={75} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getFilteredAchievements().map((achievement) => (
              <Card key={achievement.id} className={achievement.unlocked ? "" : "opacity-70"}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          achievement.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {getIconComponent(achievement.icon)}
                      </div>
                      <CardTitle className="text-base">{achievement.title}</CardTitle>
                    </div>
                    <Badge className={getLevelColor(achievement.level)}>{achievement.level}</Badge>
                  </div>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <span className="font-medium">{achievement.points} points</span>
                    </div>
                    <div>
                      {achievement.unlocked ? (
                        <span className="text-muted-foreground">
                          Earned: {new Date(achievement.dateEarned).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          {achievement.progress && achievement.total
                            ? `Progress: ${achievement.progress}/${achievement.total}`
                            : "Not yet earned"}
                        </span>
                      )}
                    </div>
                  </div>

                  {!achievement.unlocked && achievement.progress && achievement.total && (
                    <Progress value={(achievement.progress / achievement.total) * 100} className="mt-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

