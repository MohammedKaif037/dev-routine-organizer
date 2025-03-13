"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  },
]

export function AchievementsList() {
  const [activeTab, setActiveTab] = useState("all")
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements)

  const getFilteredAchievements = () => {
    if (activeTab === "all") return achievements
    if (activeTab === "unlocked") return achievements.filter((a) => a.unlocked)
    if (activeTab === "locked") return achievements.filter((a) => !a.unlocked)
    return achievements.filter((a) => a.category.toLowerCase() === activeTab)
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

  const categories = ["all", "unlocked", "locked", "consistency", "practice", "learning", "projects", "goals"]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Achievements</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Total Points:</span>
          <Badge variant="secondary" className="text-sm">
            {achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0)}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:grid-cols-8">
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
                        <span className="text-muted-foreground">Not yet earned</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

