"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ProfileAchievements } from "@/components/profile-achievements"
import { ProfileStats } from "@/components/profile-stats"
import { ProfileActivity } from "@/components/profile-activity"
import { ProfileIntegrations } from "@/components/profile-integrations"
import { Camera, Github, Twitter, Linkedin, Globe, Save, User } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: "Full-stack developer passionate about React, TypeScript, and building great user experiences.",
    location: "San Francisco, CA",
    website: "https://example.com",
    github: "github",
    twitter: "twitter",
    linkedin: "linkedin",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="container py-6 space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user?.photoURL} alt={user?.name} />
                  <AvatarFallback className="text-2xl">{user ? getInitials(user.name) : "U"}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              ) : (
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              )}
            </div>

            <div className="flex-1 space-y-4">
              {!isEditing ? (
                <>
                  <div>
                    <h1 className="text-2xl font-bold">{formData.name}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">JavaScript</Badge>
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">Next.js</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{formData.bio}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.location}</span>
                    </div>
                    {formData.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={formData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {formData.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    )}
                    {formData.github && (
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`https://github.com/${formData.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          @{formData.github}
                        </a>
                      </div>
                    )}
                    {formData.twitter && (
                      <div className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`https://twitter.com/${formData.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          @{formData.twitter}
                        </a>
                      </div>
                    )}
                    {formData.linkedin && (
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`https://linkedin.com/in/${formData.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={3} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" value={formData.location} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" name="website" value={formData.website} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="github">GitHub Username</Label>
                      <Input id="github" name="github" value={formData.github} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="twitter">Twitter Username</Label>
                      <Input id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="linkedin">LinkedIn Username</Label>
                      <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="stats" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <ProfileStats />
        </TabsContent>

        <TabsContent value="achievements">
          <ProfileAchievements />
        </TabsContent>

        <TabsContent value="activity">
          <ProfileActivity />
        </TabsContent>

        <TabsContent value="integrations">
          <ProfileIntegrations />
        </TabsContent>
      </Tabs>
    </div>
  )
}

