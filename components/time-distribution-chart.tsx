"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface TimeDistributionChartProps {
  timeRange: string
  type?: "dayHours" | "weekDays" | "duration" | "goals"
}

export function TimeDistributionChart({ timeRange, type = "dayHours" }: TimeDistributionChartProps) {
  const data = useMemo(() => {
    if (type === "dayHours") {
      return [
        { name: "6-9 AM", value: 15 },
        { name: "9-12 PM", value: 25 },
        { name: "12-3 PM", value: 20 },
        { name: "3-6 PM", value: 30 },
        { name: "6-9 PM", value: 35 },
        { name: "9-12 AM", value: 25 },
        { name: "12-6 AM", value: 5 },
      ]
    }

    if (type === "weekDays") {
      return [
        { name: "Monday", value: 65 },
        { name: "Tuesday", value: 75 },
        { name: "Wednesday", value: 85 },
        { name: "Thursday", value: 70 },
        { name: "Friday", value: 60 },
        { name: "Saturday", value: 45 },
        { name: "Sunday", value: 40 },
      ]
    }

    if (type === "duration") {
      return [
        { name: "<30 min", value: 20 },
        { name: "30-60 min", value: 35 },
        { name: "1-2 hours", value: 25 },
        { name: "2-3 hours", value: 15 },
        { name: ">3 hours", value: 5 },
      ]
    }

    if (type === "goals") {
      return [
        { name: "On Time", value: 65 },
        { name: "1-3 Days Late", value: 20 },
        { name: "4-7 Days Late", value: 10 },
        { name: ">7 Days Late", value: 5 },
      ]
    }

    return []
  }, [type])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

