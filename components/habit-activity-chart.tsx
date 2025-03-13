"use client"

import { useMemo } from "react"
import {
  Area,
  AreaChart,
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

interface HabitActivityChartProps {
  timeRange: string
  detailed?: boolean
  type?: "line" | "area" | "bar"
}

export function HabitActivityChart({ timeRange, detailed = false, type = "area" }: HabitActivityChartProps) {
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
    const habitTypes = ["Coding", "Reading", "Problem Solving", "Breaks"]

    for (let i = 0; i < dataPoints; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (dataPoints - i - 1))

      const entry: any = {
        date:
          timeRange === "year" || timeRange === "quarter"
            ? date.toLocaleString("default", { month: "short" })
            : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        total: 0,
      }

      if (detailed) {
        habitTypes.forEach((habit) => {
          const value = Math.floor(Math.random() * 100)
          entry[habit] = value
          entry.total += value
        })
      } else {
        entry.value = Math.floor(Math.random() * 100)
      }

      result.push(entry)
    }

    return result
  }, [timeRange, detailed])

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {detailed ? (
            <>
              <Legend />
              <Line type="monotone" dataKey="Coding" stroke="#8884d8" />
              <Line type="monotone" dataKey="Reading" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Problem Solving" stroke="#ffc658" />
              <Line type="monotone" dataKey="Breaks" stroke="#ff8042" />
            </>
          ) : (
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          )}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {detailed ? (
            <>
              <Legend />
              <Bar dataKey="Coding" fill="#8884d8" />
              <Bar dataKey="Reading" fill="#82ca9d" />
              <Bar dataKey="Problem Solving" fill="#ffc658" />
              <Bar dataKey="Breaks" fill="#ff8042" />
            </>
          ) : (
            <Bar dataKey="value" fill="#8884d8" />
          )}
        </BarChart>
      </ResponsiveContainer>
    )
  }

  // Default: area chart
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {detailed ? (
          <>
            <Legend />
            <Area type="monotone" dataKey="Coding" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="Reading" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="Problem Solving" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="Breaks" stackId="1" stroke="#ff8042" fill="#ff8042" />
          </>
        ) : (
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        )}
      </AreaChart>
    </ResponsiveContainer>
  )
}

