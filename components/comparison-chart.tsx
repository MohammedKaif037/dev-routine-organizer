"use client"

import { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

interface ComparisonChartProps {
  timeRange: string
  type?: "community" | "personal" | "goals"
}

export function ComparisonChart({ timeRange, type = "community" }: ComparisonChartProps) {
  const data = useMemo(() => {
    // Generate mock data based on time range
    const dataPoints =
      timeRange === "week"
        ? 7
        : timeRange === "month"
          ? 30
          : timeRange === "quarter"
            ? 12
            : timeRange === "year"
              ? 12
              : 7

    const result = []

    for (let i = 0; i < dataPoints; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (dataPoints - i - 1))

      const entry: any = {
        date:
          timeRange === "year" || timeRange === "quarter"
            ? date.toLocaleString("default", { month: "short" })
            : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }

      if (type === "community") {
        entry.you = Math.floor(Math.random() * 100)
        entry.average = Math.floor(Math.random() * 100)
        entry.top = Math.floor(Math.random() * 100) + 20
      } else if (type === "personal") {
        entry.current = Math.floor(Math.random() * 100)
        entry.previous = Math.floor(Math.random() * 100)
      } else if (type === "goals") {
        entry.planned = Math.floor(Math.random() * 100)
        entry.actual = Math.floor(Math.random() * 100)
      }

      result.push(entry)
    }

    return result
  }, [timeRange, type])

  if (type === "community") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="you" stroke="#8884d8" name="You" />
          <Line type="monotone" dataKey="average" stroke="#82ca9d" name="Community Average" />
          <Line type="monotone" dataKey="top" stroke="#ffc658" name="Top Performers" />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === "personal") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="current" fill="#8884d8" name="Current Period" />
          <Bar dataKey="previous" fill="#82ca9d" name="Previous Period" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  // Goals comparison
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="planned" fill="#8884d8" name="Planned" />
        <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
      </BarChart>
    </ResponsiveContainer>
  )
}

