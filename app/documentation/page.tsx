"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  BookOpen,
  FileText,
  Code,
  HelpCircle,
  Star,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Mail,
  Play,
} from "lucide-react"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground">
          Learn how to use DevHabit effectively and get the most out of your coding habits
        </p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search documentation..." 
          className="pl-10 h-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Everything you need to know to get started with DevHabit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4 hover:bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Introduction</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn about DevHabit and how it can help you build better coding habits.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Read Guide
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
              
              <div className="rounded-lg border p-4 hover:bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Setting Up Your Profile</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Configure your profile and preferences to personalize your experience.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Read Guide
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
              
              <div className="rounded-lg border p-4 hover:bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Code className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Creating Your First Habit</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how to create, track, and maintain coding habits effectively.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Read Guide
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
              
              <div className="rounded-lg border p-4 hover:bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Setting Goals</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Set meaningful goals and track your progress towards achieving them.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Read Guide
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-3">Popular Articles</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    How to maintain a long coding streak
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    Integrating DevHabit with GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    Using statistics to improve your habits
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    Community features and collaboration
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Get support from our team or community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 hover:bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">FAQ</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Find answers to commonly asked questions.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View FAQ
                </Button>
              </div>
              
              <div className="rounded-lg border p-4 hover:bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Community Support</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Ask questions and get help from other developers.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Join Discussion
                </Button>
              </div>
              
              <div className="rounded-lg border p-4 hover:bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">Contact Support</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Reach out to our support team for assistance.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>
                Learn visually with our tutorial videos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Play className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">Getting Started with DevHabit</h3>
                  <p className="text-xs text-muted-foreground mt-1">5:32</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <a href="#" className="text-sm text-primary hover:underline flex items-center">
                  <Play className="mr-2 h-3 w-3" />
                  Setting up integrations (3:45)
                </a>
                <a href="#" className="text-sm text-primary hover:underline flex items-center">
                  <Play className="mr-2 h-3 w-3" />
                  Advanced goal tracking (7:12)
                </a>
                <a href="#" className="text-sm text-primary hover:underline flex items-center">
                  <Play className="mr-2 h-3 w-3" />
                  Using the statistics dashboard (4:28)
                </a>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                View All Tutorials
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="guides" className="space-y-4">
        <TabsList>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guides" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Habit Tracking",
                description: "Learn how to effectively track your coding habits",
                tags: ["habits", "tracking", "productivity"],
              },
              {
                title: "Goal Setting",
                description: "Set SMART goals to improve your development skills",
                tags: ["goals", "planning", "achievement"],
              },
              {
                title: "Statistics & Analytics",
                description: "Understand your data and improve your habits",
                tags: ["stats", "analytics", "insights"],
              },
              {
                title: "Community Features",
                description: "Engage with other developers and share your journey",
                tags: ["community", "social", "collaboration"],
              },
              {
                title: "Integrations",
                description: "Connect DevHabit with your development tools",
                tags: ["github", "vscode", "integrations"],
              },
              {
                title: "Mobile Usage",
                description: "Track your habits on the go with our mobile app",
                tags: ["mobile", "app", "responsive"],
              },
            ].map((guide, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {guide.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Read Guide
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Integrate with DevHabit using our REST API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Authentication</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how to authenticate with the DevHabit API using API keys or OAuth.
                </p>
                <Button variant="outline" size="sm">View Documentation</Button>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Endpoints</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Explore available API endpoints for habits, goals, and user data.
                </p>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">/api/habits</code>
                    <Badge>GET, POST</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">/api/goals</code>
                    <Badge>GET, POST</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">/api/stats</code>
                    <Badge>GET</Badge>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Webhooks</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Set up webhooks to receive real-time updates when habits are completed.
                </p>
                <Button variant="outline" size="sm">View Documentation</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open API Reference
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Example Projects</CardTitle>
                <CardDescription>
                  See how others are using DevHabit in their workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">GitHub Integration Example</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Track your GitHub commits as coding habits automatically.
                  </p>
                  <Button variant="outline" size="sm">View Example</Button>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">VS Code Extension</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Track coding time directly from your editor.
                  </p>
                  <Button variant="outline" size="sm">View Example</Button>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Team Dashboard</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Create a shared dashboard for your development team.
                  </p>
                  <Button variant="outline" size="sm">View Example</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Code Snippets</CardTitle>
                <CardDescription>
                  Useful code examples for common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Track Coding Time</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    JavaScript snippet to track coding time in your projects.
                  </p>
                  <div className="bg-muted p-3 rounded-md text-xs font-mono mb-3 overflow-x-auto">
                    <pre>{`// Track coding time
const startTime = Date.now();

// When finished coding
function endCodingSession() {
  const duration = (Date.now() - startTime) / 1000 / 60;
  trackHabit('coding', duration);
}`}</pre>
                  </div>
                  <Button variant="outline" size="sm">Copy Code</Button>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">API Authentication</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Authenticate with the DevHabit API.
                  </p>
                  <div className="bg-muted p-3 rounded-md text-xs font-mono mb-3 overflow-x-auto">
                    <pre>{`// Authenticate with API
async function authenticate() {
  const response = await fetch('https://api.devhabit.com/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: 'YOUR_API_KEY'
    }),
  });
  return response.json();
}`}</pre>
                  </div>
                  <Button variant="outline" size="sm">Copy Code</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>
                Helpful resources to enhance your development journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Books</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Atomic Habits by James Clear
                      </a>
                    </li>
                    <li className="text-sm">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Deep Work by Cal Newport
                      </a>
                    </li>
                    <li className="text-sm">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        The Pragmatic Programmer
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Blogs & Articles</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Building a Coding Habit That Sticks
                      </a>
                    </li>
                    <li className="text-sm">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        The Science of Productive Learning
                      </a>
                    </li>
                    <li className="text-sm">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        How Top Developers Stay Productive
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Podcasts</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        CodeNewbie
                      </a>
                    </li>
                    <li className="text-sm">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Syntax.fm
                      </a>
                    </li>
                    <li className="text-sm">
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Developer Tea
                     </a>
                   </li>
                 </ul>
               </div>
               
               <div className="rounded-lg border p-4">
                 <h3 className="font-medium">Tools</h3>
                 <ul className="mt-2 space-y-2">
                   <li className="text-sm">
                     <a href="#" className="text-primary hover:underline flex items-center">
                       <ExternalLink className="mr-2 h-3 w-3" />
                       Pomodoro Timer for Developers
                     </a>
                   </li>
                   <li className="text-sm">
                     <a href="#" className="text-primary hover:underline flex items-center">
                       <ExternalLink className="mr-2 h-3 w-3" />
                       WakaTime Productivity Tracker
                     </a>
                   </li>
                   <li className="text-sm">
                     <a href="#" className="text-primary hover:underline flex items-center">
                       <ExternalLink className="mr-2 h-3 w-3" />
                       GitHub Contribution Calendar
                     </a>
                   </li>
                 </ul>
               </div>
             </div>
           </CardContent>
         </Card>
       </TabsContent>
     </Tabs>
     
     <div className="border-t pt-8">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
           <h2 className="text-xl font-bold">Need more help?</h2>
           <p className="text-muted-foreground">
             Reach out to our support team or join our community forums
           </p>
         </div>
         <div className="flex gap-4">
           <Button variant="outline">
             <MessageSquare className="mr-2 h-4 w-4" />
             Community Forum
           </Button>
           <Button>
             <Mail className="mr-2 h-4 w-4" />
             Contact Support
           </Button>
         </div>
       </div>
     </div>
   </div>
 )
}

