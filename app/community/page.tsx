"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { CommunityLeaderboard } from "@/components/community-leaderboard"
import { CommunityDiscussions } from "@/components/community-discussions"
import { CommunityChallenges } from "@/components/community-challenges"
import { MessageSquare, Users, Trophy, Search, Send, ThumbsUp, MessageCircle, Share2 } from "lucide-react"

export default function CommunityPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [postContent, setPostContent] = useState("")

  const handleCreatePost = () => {
    if (!postContent.trim()) return

    toast({
      title: "Post created",
      description: "Your post has been shared with the community.",
    })

    setPostContent("")
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Developer Community</h1>
          <p className="text-muted-foreground">Connect with other developers and share your coding journey</p>
        </div>
        <div className="w-full sm:w-auto flex gap-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search community..." className="pl-8" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Create a Post</CardTitle>
          <CardDescription>Share your thoughts, questions, or achievements with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={user?.photoURL} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[100px] resize-none"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Add Image
            </Button>
            <Button variant="outline" size="sm">
              Add Code
            </Button>
          </div>
          <Button onClick={handleCreatePost} disabled={!postContent.trim()}>
            <Send className="mr-2 h-4 w-4" />
            Post
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="feed">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="discussions">
            <Users className="mr-2 h-4 w-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="challenges">
            <Trophy className="mr-2 h-4 w-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboard">
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <div className="space-y-4">
            {[1, 2, 3].map((post) => (
              <Card key={post}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={`https://github.com/shadcn.png`} />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">User Name {post}</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="mt-2">
                        {post === 1 &&
                          "Just completed my first full-stack project using Next.js and Firebase! It's a habit tracker for developers. Check it out and let me know what you think!"}
                        {post === 2 &&
                          "Does anyone have recommendations for learning TypeScript? I'm finding the transition from JavaScript a bit challenging."}
                        {post === 3 &&
                          "Reached a 30-day coding streak today! The consistency is really paying off in terms of my skills and confidence."}
                      </p>
                      {post === 1 && (
                        <div className="mt-3 rounded-md border overflow-hidden">
                          <img
                            src="/placeholder.svg?height=200&width=400"
                            alt="Project screenshot"
                            className="w-full h-[200px] object-cover"
                          />
                        </div>
                      )}
                      {post === 3 && (
                        <div className="mt-3 flex items-center gap-2">
                          <Badge className="bg-green-500 hover:bg-green-500">
                            <Trophy className="mr-1 h-3 w-3" />
                            30-Day Streak
                          </Badge>
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          {post * 5 + 3}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="mr-1 h-4 w-4" />
                          {post * 2 + 1}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="mr-1 h-4 w-4" />
                          Share
                        </Button>
                      </div>

                      {post === 2 && (
                        <div className="mt-4 pl-6 border-l-2 space-y-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://github.com/shadcn.png`} />
                              <AvatarFallback>RJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">Reply User</span>
                                <span className="text-xs text-muted-foreground">1 hour ago</span>
                              </div>
                              <p className="text-sm mt-1">
                                I'd recommend the TypeScript documentation and Matt Pocock's tutorials. They really
                                helped me understand the type system.
                              </p>
                              <div className="mt-2 flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  <ThumbsUp className="mr-1 h-3 w-3" />4
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  <MessageCircle className="mr-1 h-3 w-3" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.photoURL} />
                          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <Input placeholder="Write a comment..." className="h-8" />
                        <Button size="icon" className="h-8 w-8">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discussions">
          <CommunityDiscussions />
        </TabsContent>

        <TabsContent value="challenges">
          <CommunityChallenges />
        </TabsContent>

        <TabsContent value="leaderboard">
          <CommunityLeaderboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

