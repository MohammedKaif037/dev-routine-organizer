import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HabitDashboard } from "@/components/habit-dashboard"
import { GoalsList } from "@/components/goals-list"
import { AchievementsList } from "@/components/achievements-list"
import { RecentActivity } from "@/components/recent-activity"
import { CommunityHighlights } from "@/components/community-highlights"
import { ResourceLibrary } from "@/components/resource-library"
import { UserGreeting } from "@/components/user-greeting"
import { HabitStats } from "@/components/habit-stats"

export default function Home() {
  return (
    <div className="container py-6 space-y-8">
      <UserGreeting />

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="habits">Habits</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <HabitStats />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Streak</CardTitle>
                <CardDescription>Your coding consistency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold">7</div>
                    <div className="text-sm text-muted-foreground mt-1">days</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest coding sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Community Highlights</CardTitle>
                <CardDescription>See what other developers are achieving</CardDescription>
              </CardHeader>
              <CardContent>
                <CommunityHighlights />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Join Discussions
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Resources</CardTitle>
                <CardDescription>Curated learning materials for you</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] overflow-auto">
                <ResourceLibrary />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse Library
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="habits" className="space-y-4">
          <HabitDashboard />
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <GoalsList />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <AchievementsList />
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Developer Community</CardTitle>
              <CardDescription>Connect with other developers and share your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Discussion Forums</h3>
                  <p className="text-sm text-muted-foreground">
                    Join conversations about coding habits, challenges, and tips
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Browse Forums
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Coding Challenges</h3>
                  <p className="text-sm text-muted-foreground">Participate in daily and weekly coding challenges</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Challenges
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Accountability Partners</h3>
                  <p className="text-sm text-muted-foreground">Find a partner to help keep you accountable</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Find Partners
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
              <CardDescription>Curated learning materials for developers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {["JavaScript", "React", "Node.js", "Python", "CSS", "Git"].map((category) => (
                    <div key={category} className="border rounded-lg p-4">
                      <h3 className="font-medium">{category}</h3>
                      <p className="text-sm text-muted-foreground">Resources for {category}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Browse
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

