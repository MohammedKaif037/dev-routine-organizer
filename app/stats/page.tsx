"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { HabitActivityChart } from "@/components/habit-activity-chart"
import { GoalProgressChart } from "@/components/goal-progress-chart"
import { StreakCalendar } from "@/components/streak-calendar"
import { CategoryDistributionChart } from "@/components/category-distribution-chart"
import { TimeDistributionChart } from "@/components/time-distribution-chart"
import { ComparisonChart } from "@/components/comparison-chart"

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-muted-foreground">Track your progress and analyze your coding habits</p>
        </div>
        <div className="w-full sm:w-auto">
          <Label htmlFor="time-range" className="sr-only">
            Time Range
          </Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger id="time-range" className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 3 months</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="habits">Habits</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="time">Time Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Habit Completion Rate</CardTitle>
                <CardDescription>Percentage of habits completed over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <HabitActivityChart timeRange={timeRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
                <CardDescription>Progress towards your goals</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <GoalProgressChart timeRange={timeRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Time spent on different categories</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CategoryDistributionChart timeRange={timeRange} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Coding Streak Calendar</CardTitle>
              <CardDescription>Your daily coding activity</CardDescription>
            </CardHeader>
            <CardContent>
              <StreakCalendar timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Habit Completion Trends</CardTitle>
              <CardDescription>How your habit completion has changed over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <HabitActivityChart timeRange={timeRange} detailed />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Consistent Habits</CardTitle>
                <CardDescription>Habits you complete most regularly</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CategoryDistributionChart timeRange={timeRange} type="consistency" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Challenging Habits</CardTitle>
                <CardDescription>Habits you struggle to complete</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CategoryDistributionChart timeRange={timeRange} type="challenges" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goal Completion Timeline</CardTitle>
              <CardDescription>Progress towards your goals over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <GoalProgressChart timeRange={timeRange} detailed />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Goal Categories</CardTitle>
                <CardDescription>Distribution of goals by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CategoryDistributionChart timeRange={timeRange} type="goals" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Completion Rate</CardTitle>
                <CardDescription>How often you complete goals on time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <TimeDistributionChart timeRange={timeRange} type="goals" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Time of Day</CardTitle>
                <CardDescription>When you're most active</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <TimeDistributionChart timeRange={timeRange} type="dayHours" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Day of Week</CardTitle>
                <CardDescription>Which days you're most productive</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <TimeDistributionChart timeRange={timeRange} type="weekDays" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Session Duration</CardTitle>
              <CardDescription>Length of your coding sessions over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <TimeDistributionChart timeRange={timeRange} type="duration" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Comparison</CardTitle>
              <CardDescription>How your habits compare to other developers</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ComparisonChart timeRange={timeRange} type="community" />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Improvement</CardTitle>
                <CardDescription>Your progress compared to previous periods</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ComparisonChart timeRange={timeRange} type="personal" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal vs. Reality</CardTitle>
                <CardDescription>Planned vs. actual time spent coding</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ComparisonChart timeRange={timeRange} type="goals" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

