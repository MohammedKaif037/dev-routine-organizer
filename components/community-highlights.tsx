"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, MessageSquare, ThumbsUp } from "lucide-react"

type CommunityPost = {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  content: string
  achievement?: string
  likes: number
  comments: number
  timestamp: string
}

const mockPosts: CommunityPost[] = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      avatar: "https://github.com/shadcn.png",
      initials: "AJ",
    },
    content: "Just completed my 30-day coding streak! Feeling accomplished.",
    achievement: "Code Streak Master",
    likes: 24,
    comments: 5,
    timestamp: "2025-03-12T15:30:00",
  },
  {
    id: "2",
    user: {
      name: "Sam Taylor",
      avatar: "",
      initials: "ST",
    },
    content: "Solved a complex algorithm problem that I've been stuck on for days. Never give up!",
    likes: 18,
    comments: 3,
    timestamp: "2025-03-13T09:45:00",
  },
  {
    id: "3",
    user: {
      name: "Jamie Rivera",
      avatar: "",
      initials: "JR",
    },
    content: "Just launched my first full-stack application. Check it out and let me know what you think!",
    achievement: "Project Launcher",
    likes: 32,
    comments: 8,
    timestamp: "2025-03-11T18:20:00",
  },
]

export function CommunityHighlights() {
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
      {mockPosts.map((post) => (
        <div key={post.id} className="space-y-2">
          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="text-sm font-medium">{post.user.name}</span>
                {post.achievement && (
                  <div className="ml-2 flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    <Trophy className="mr-1 h-3 w-3" />
                    {post.achievement}
                  </div>
                )}
              </div>
              <p className="text-sm">{post.content}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{formatTimeAgo(post.timestamp)}</span>
                <div className="flex items-center">
                  <ThumbsUp className="mr-1 h-3 w-3" />
                  {post.likes}
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  {post.comments}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

