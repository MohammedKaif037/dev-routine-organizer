"use client"

import { useEffect, useRef } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface HabitProgressRingProps {
  progress: number
  target: number
  size: number
  strokeWidth: number
  completed?: boolean
  className?: string
}

export function HabitProgressRing({
  progress,
  target,
  size,
  strokeWidth,
  completed = false,
  className,
}: HabitProgressRingProps) {
  const percentage = Math.min(100, Math.round((progress / target) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = `${offset}`
    }
  }, [offset])

  return (
    <div className={cn("relative", className)}>
      <svg width={size} height={size}>
        <circle
          className="stroke-muted"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          strokeWidth={strokeWidth}
        />
        <circle
          ref={circleRef}
          className={cn("progress-ring-circle", completed ? "stroke-green-500" : "stroke-primary")}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {completed ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <span className="text-sm font-medium">{percentage}%</span>
        )}
      </div>
    </div>
  )
}

