"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HabitActivityChart } from "@/components/habit-activity-chart"
import { CategoryDistributionChart } from "@/components/category-distribution-chart"
import { TimeDistributionChart } from "@/components/time-distribution-chart"

export function ProfileStats() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Coding Time</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156h 45m</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Longest Streak</CardTitle>
            <CardDescription>Consecutive days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">14 days</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Habits Completed</CardTitle>
            <CardDescription>Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Goals Achieved</CardTitle>
            <CardDescription>Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activity Over Time</CardTitle>
            <CardDescription>Your coding activity history</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <HabitActivityChart timeRange="month" type="line" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
            <CardDescription>How you spend your coding time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <CategoryDistributionChart timeRange="month" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Time of Day</CardTitle>
            <CardDescription>When you're most active</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <TimeDistributionChart timeRange="month" type="dayHours" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Day of Week</CardTitle>
            <CardDescription>Which days you're most productive</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <TimeDistributionChart timeRange="month" type="weekDays" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

