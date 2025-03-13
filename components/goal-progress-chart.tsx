"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface GoalProgressChartProps {
  timeRange: string
  detailed?: boolean
}

export function GoalProgressChart({ timeRange, detailed = false }: GoalProgressChartProps) {
  const data = useMemo(() => {
    // Generate mock data based on time range
    const dataPoints =
      timeRange === "week"
        ? 5
        : timeRange === "month"
          ? 8
          : timeRange === "quarter"
            ? 10
            : timeRange === "year"
              ? 12
              : 5

    const result = []

    for (let i = 0; i < dataPoints; i++) {
      const entry: any = {
        name: `Goal ${i + 1}`,
        target: 100,
      }

      const progress = Math.floor(Math.random() * 100)
      entry.progress = progress

      if (detailed) {
        entry.remaining = 100 - progress
      }

      result.push(entry)
    }

    return result
  }, [timeRange, detailed])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 70, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="progress" name="Progress" stackId="a" fill="#8884d8" />
        {detailed && <Bar dataKey="remaining" name="Remaining" stackId="a" fill="#82ca9d" />}
      </BarChart>
    </ResponsiveContainer>
  )
}

