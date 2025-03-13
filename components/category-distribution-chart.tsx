"use client"

import { useMemo } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

interface CategoryDistributionChartProps {
  timeRange: string
  type?: "default" | "consistency" | "challenges" | "goals"
}

export function CategoryDistributionChart({ timeRange, type = "default" }: CategoryDistributionChartProps) {
  const data = useMemo(() => {
    // Different data based on chart type
    if (type === "consistency") {
      return [
        { name: "Daily Coding", value: 40 },
        { name: "Reading Docs", value: 25 },
        { name: "Problem Solving", value: 20 },
        { name: "Taking Breaks", value: 15 },
      ]
    }

    if (type === "challenges") {
      return [
        { name: "Advanced Algorithms", value: 35 },
        { name: "System Design", value: 30 },
        { name: "Testing", value: 20 },
        { name: "Documentation", value: 15 },
      ]
    }

    if (type === "goals") {
      return [
        { name: "Learning", value: 35 },
        { name: "Practice", value: 25 },
        { name: "Projects", value: 30 },
        { name: "Career", value: 10 },
      ]
    }

    // Default
    return [
      { name: "Coding", value: 40 },
      { name: "Reading", value: 20 },
      { name: "Problem Solving", value: 25 },
      { name: "Breaks", value: 15 },
    ]
  }, [type])

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

