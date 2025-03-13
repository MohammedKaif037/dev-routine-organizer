"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, MessageCircle, Tag, Users, Clock } from "lucide-react"

type Discussion = {
  id: string
  title: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  category: string
  tags: string[]
  timestamp: string
  replies: number
  views: number
  likes: number
  excerpt: string
  solved?: boolean
}

const mockDiscussions: Discussion[] = [
  {
    id: "1",
    title: "Best practices for organizing React components in a large project?",
    author: {
      name: "Alex Johnson",
      avatar: "https://github.com/shadcn.png",
      initials: "AJ",
    },
    category: "React",
    tags: ["react", "architecture", "best-practices"],
    timestamp: "2025-03-12T15:30:00",
    replies: 12,
    views: 156,
    likes: 24,
    excerpt:
      "I'm working on a large-scale React application and struggling with component organization. What folder structure and patterns do you recommend?",
  },
  {
    id: "2",
    title: "How to optimize TypeScript compilation time in a monorepo?",
    author: {
      name: "Sam Taylor",
      avatar: "",
      initials: "ST",
    },
    category: "TypeScript",
    tags: ["typescript", "performance", "monorepo"],
    timestamp: "2025-03-13T09:45:00",
    replies: 8,
    views: 92,
    likes: 18,
    excerpt:
      "Our TypeScript compilation is taking too long in our monorepo setup. Any tips for speeding it up without sacrificing type safety?",
    solved: true,
  },
  {
    id: "3",
    title: "Strategies for learning multiple programming languages efficiently",
    author: {
      name: "Jamie Rivera",
      avatar: "",
      initials: "JR",
    },
    category: "Learning",
    tags: ["learning", "productivity", "career"],
    timestamp: "2025-03-11T18:20:00",
    replies: 15,
    views: 210,
    likes: 32,
    excerpt:
      "I want to expand my skill set beyond JavaScript. What's the most efficient way to learn multiple languages without getting overwhelmed?",
  },
  {
    id: "4",
    title: "Debugging memory leaks in Node.js applications",
    author: {
      name: "Morgan Lee",
      avatar: "",
      initials: "ML",
    },
    category: "Node.js",
    tags: ["node.js", "debugging", "performance"],
    timestamp: "2025-03-10T14:15:00",
    replies: 7,
    views: 85,
    likes: 14,
    excerpt:
      "Our Node.js app is experiencing memory leaks in production. What tools and techniques do you recommend for identifying and fixing them?",
  },
  {
    id: "5",
    title: "How to structure a portfolio for a junior developer position?",
    author: {
      name: "Taylor Kim",
      avatar: "",
      initials: "TK",
    },
    category: "Career",
    tags: ["portfolio", "career", "job-hunting"],
    timestamp: "2025-03-09T11:30:00",
    replies: 20,
    views: 315,
    likes: 45,
    excerpt:
      "I'm preparing to apply for junior developer positions. What projects and skills should I highlight in my portfolio to stand out?",
    solved: true,
  },
]

export function CommunityDiscussions() {
  const [activeTab, setActiveTab] = useState("all")

  const getFilteredDiscussions = () => {
    if (activeTab === "all") return mockDiscussions
    if (activeTab === "solved") return mockDiscussions.filter((d) => d.solved)
    return mockDiscussions.filter((d) => d.category.toLowerCase() === activeTab.toLowerCase())
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60))

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
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Discussion Forums</CardTitle>
              <CardDescription>Join conversations about coding habits, challenges, and tips</CardDescription>
            </div>
            <div className="w-full sm:w-auto">
              <Input placeholder="Search discussions..." className="w-full sm:w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                <TabsTrigger value="node.js">Node.js</TabsTrigger>
                <TabsTrigger value="career">Career</TabsTrigger>
                <TabsTrigger value="solved">Solved</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="divide-y">
                {getFilteredDiscussions().map((discussion) => (
                  <div key={discussion.id} className="p-6 hover:bg-muted/50">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                        <AvatarFallback>{discussion.author.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">
                              {discussion.title}
                              {discussion.solved && (
                                <Badge className="ml-2 bg-green-500 hover:bg-green-500">Solved</Badge>
                              )}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                              <span>{discussion.author.name}</span>
                              <span>•</span>
                              <span>{formatTimeAgo(discussion.timestamp)}</span>
                              <span>•</span>
                              <Badge variant="outline">{discussion.category}</Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm">{discussion.excerpt}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MessageCircle className="mr-1 h-4 w-4" />
                            {discussion.replies} replies
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            {discussion.views} views
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {discussion.likes} likes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between p-6">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Recent
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Start a Discussion
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

