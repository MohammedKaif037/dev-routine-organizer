"use client"

import { useMemo } from "react"

interface StreakCalendarProps {
  timeRange: string
}

export function StreakCalendar({ timeRange }: StreakCalendarProps) {
  const calendarData = useMemo(() => {
    // Generate mock data for the calendar
    const today = new Date()
    const startDate = new Date()

    if (timeRange === "week") {
      startDate.setDate(today.getDate() - 7)
    } else if (timeRange === "month") {
      startDate.setDate(today.getDate() - 30)
    } else if (timeRange === "quarter") {
      startDate.setDate(today.getDate() - 90)
    } else if (timeRange === "year") {
      startDate.setDate(today.getDate() - 365)
    } else {
      startDate.setDate(today.getDate() - 30) // Default to month
    }

    // Generate days between start date and today
    const days = []
    const currentDate = new Date(startDate)

    while (currentDate <= today) {
      days.push({
        date: new Date(currentDate),
        activity: Math.random() > 0.3, // 70% chance of activity
        intensity: Math.floor(Math.random() * 4) + 1, // 1-4 intensity
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }, [timeRange])

  // Group days by week for display
  const weeks = useMemo(() => {
    const result = []
    let currentWeek = []

    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDay = calendarData[0].date.getDay()

    // Add empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null)
    }

    // Add days to weeks
    calendarData.forEach((day, index) => {
      currentWeek.push(day)

      if (currentWeek.length === 7 || index === calendarData.length - 1) {
        // Fill the rest of the week with empty cells
        while (currentWeek.length < 7) {
          currentWeek.push(null)
        }

        result.push([...currentWeek])
        currentWeek = []
      }
    })

    return result
  }, [calendarData])

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getIntensityClass = (intensity: number) => {
    switch (intensity) {
      case 1:
        return "bg-primary/25"
      case 2:
        return "bg-primary/50"
      case 3:
        return "bg-primary/75"
      case 4:
        return "bg-primary"
      default:
        return "bg-primary/25"
    }
  }

  return (
    <div className="p-2">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`aspect-square rounded-sm ${
                  day ? (day.activity ? getIntensityClass(day.intensity) : "bg-muted") : "bg-transparent"
                }`}
                title={day ? `${day.date.toLocaleDateString()}: ${day.activity ? "Active" : "Inactive"}` : ""}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <span className="text-xs text-muted-foreground">No activity</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-primary/25" />
          <span className="text-xs text-muted-foreground">Light</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-primary/50" />
          <span className="text-xs text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-primary/75" />
          <span className="text-xs text-muted-foreground">High</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-primary" />
          <span className="text-xs text-muted-foreground">Intense</span>
        </div>
      </div>
    </div>
  )
}

