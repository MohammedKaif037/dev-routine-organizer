"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Calendar } from "lucide-react"

type LeaderboardUser = {
  id: string
  name: string
  avatar: string
  initials: string
  points: number
  streak: number
  rank: number
  achievements: number
  level: string
  specialty: string
}

const mockUsers: LeaderboardUser[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://github.com/shadcn.png",
    initials: "AJ",
    points: 1250,
    streak: 32,
    rank: 1,
    achievements: 24,
    level: "Expert",
    specialty: "React",
  },
  {
    id: "2",
    name: "Sam Taylor",
    avatar: "",
    initials: "ST",
    points: 980,
    streak: 14,
    rank: 2,
    achievements: 18,
    level: "Advanced",
    specialty: "TypeScript",
  },
  {
    id: "3",
    name: "Jamie Rivera",
    avatar: "",
    initials: "JR",
    points: 875,
    streak: 21,
    rank: 3,
    achievements: 15,
    level: "Advanced",
    specialty: "Node.js",
  },
  {
    id: "4",
    name: "Morgan Lee",
    avatar: "",
    initials: "ML",
    points: 720,
    streak: 10,
    rank: 4,
    achievements: 12,
    level: "Intermediate",
    specialty: "CSS",
  },
  {
    id: "5",
    name: "Taylor Kim",
    avatar: "",
    initials: "TK",
    points: 650,
    streak: 8,
    rank: 5,
    achievements: 10,
    level: "Intermediate",
    specialty: "Python",
  },
  {
    id: "6",
    name: "Jordan Smith",
    avatar: "",
    initials: "JS",
    points: 580,
    streak: 12,
    rank: 6,
    achievements: 9,
    level: "Intermediate",
    specialty: "Vue.js",
  },
  {
    id: "7",
    name: "Casey Wilson",
    avatar: "",
    initials: "CW",
    points: 520,
    streak: 7,
    rank: 7,
    achievements: 8,
    level: "Beginner",
    specialty: "Java",
  },
  {
    id: "8",
    name: "Riley Brown",
    avatar: "",
    initials: "RB",
    points: 450,
    streak: 5,
    rank: 8,
    achievements: 7,
    level: "Beginner",
    specialty: "C#",
  },
  {
    id: "9",
    name: "Quinn Davis",
    avatar: "",
    initials: "QD",
    points: 380,
    streak: 4,
    rank: 9,
    achievements: 6,
    level: "Beginner",
    specialty: "Go",
  },
  {
    id: "10",
    name: "Avery Martin",
    avatar: "",
    initials: "AM",
    points: 320,
    streak: 3,
    rank: 10,
    achievements: 5,
    level: "Beginner",
    specialty: "Ruby",
  },
]

export function CommunityLeaderboard() {
  const [activeTab, setActiveTab] = useState("points")
  const [timeRange, setTimeRange] = useState("all-time")

  const getSortedUsers = () => {
    const users = [...mockUsers]

    if (activeTab === "points") {
      return users.sort((a, b) => b.points - a.points)
    } else if (activeTab === "streak") {
      return users.sort((a, b) => b.streak - a.streak)
    } else if (activeTab === "achievements") {
      return users.sort((a, b) => b.achievements - a.achievements)
    }

    return users
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-500">
          <Trophy className="mr-1 h-3 w-3" />
          1st
        </Badge>
      )
    } else if (rank === 2) {
      return (
        <Badge className="bg-slate-400 hover:bg-slate-400">
          <Medal className="mr-1 h-3 w-3" />
          2nd
        </Badge>
      )
    } else if (rank === 3) {
      return (
        <Badge className="bg-amber-700 hover:bg-amber-700">
          <Award className="mr-1 h-3 w-3" />
          3rd
        </Badge>
      )
    }

    return <Badge variant="outline">{rank}th</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Developer Leaderboard</CardTitle>
            <CardDescription>See how you rank against other developers</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="points" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="points">
              <Trophy className="mr-2 h-4 w-4" />
              Points
            </TabsTrigger>
            <TabsTrigger value="streak">
              <Calendar className="mr-2 h-4 w-4" />
              Streaks
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Award className="mr-2 h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {getSortedUsers().map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                index === 0 ? "bg-primary/10" : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 text-center font-medium">
                  {getRankBadge(index + 1)}
                </div>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>{user.level}</span>
                    <span>•</span>
                    <span>{user.specialty}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                {activeTab === "points" && <div className="font-bold">{user.points.toLocaleString()} pts</div>}
                {activeTab === "streak" && <div className="font-bold">{user.streak} days</div>}
                {activeTab === "achievements" && <div className="font-bold">{user.achievements}</div>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

