"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Plus, Code, BookOpen, Coffee, Brain, Edit, Trash2 } from "lucide-react"
import { HabitProgressRing } from "@/components/habit-progress-ring"

type Habit = {
  id: string
  name: string
  description: string
  icon: string
  target: number
  unit: string
  frequency: string
  progress: number
  streak: number
  completed: boolean
}

const mockHabits: Habit[] = [
  {
    id: "1",
    name: "Daily Coding",
    description: "Write code every day to build consistency",
    icon: "code",
    target: 60,
    unit: "minutes",
    frequency: "daily",
    progress: 45,
    streak: 7,
    completed: false,
  },
  {
    id: "2",
    name: "Read Documentation",
    description: "Read technical documentation to improve knowledge",
    icon: "book",
    target: 30,
    unit: "minutes",
    frequency: "daily",
    progress: 30,
    streak: 4,
    completed: true,
  },
  {
    id: "3",
    name: "Solve Coding Problems",
    description: "Solve algorithm challenges to improve problem-solving",
    icon: "brain",
    target: 3,
    unit: "problems",
    frequency: "daily",
    progress: 1,
    streak: 2,
    completed: false,
  },
  {
    id: "4",
    name: "Take Coding Breaks",
    description: "Take regular breaks to maintain productivity",
    icon: "coffee",
    target: 5,
    unit: "breaks",
    frequency: "daily",
    progress: 3,
    streak: 5,
    completed: false,
  },
]

export function HabitDashboard() {
  const [habits, setHabits] = useState<Habit[]>(mockHabits)
  const [open, setOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const { toast } = useToast()

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="h-5 w-5" />
      case "book":
        return <BookOpen className="h-5 w-5" />
      case "coffee":
        return <Coffee className="h-5 w-5" />
      case "brain":
        return <Brain className="h-5 w-5" />
      default:
        return <Code className="h-5 w-5" />
    }
  }

  const handleAddHabit = (habit: Omit<Habit, "id" | "progress" | "streak" | "completed">) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      ...habit,
      progress: 0,
      streak: 0,
      completed: false,
    }

    setHabits([...habits, newHabit])
    setOpen(false)

    toast({
      title: "Habit created",
      description: `${habit.name} has been added to your habits.`,
    })
  }

  const handleEditHabit = (updatedHabit: Habit) => {
    setHabits(habits.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit)))
    setEditingHabit(null)

    toast({
      title: "Habit updated",
      description: `${updatedHabit.name} has been updated.`,
    })
  }

  const handleDeleteHabit = (id: string) => {
    const habitToDelete = habits.find((h) => h.id === id)
    setHabits(habits.filter((habit) => habit.id !== id))

    toast({
      title: "Habit deleted",
      description: `${habitToDelete?.name} has been removed from your habits.`,
    })
  }

  const handleToggleComplete = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed, progress: !habit.completed ? habit.target : habit.progress }
          : habit,
      ),
    )
  }

  const handleUpdateProgress = (id: string, newProgress: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              progress: newProgress,
              completed: newProgress >= habit.target,
            }
          : habit,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Habits</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <HabitForm onSubmit={handleAddHabit} onCancel={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => (
          <Card key={habit.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {getIconComponent(habit.icon)}
                  </div>
                  <CardTitle>{habit.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => setEditingHabit(habit)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteHabit(habit.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{habit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    Target: {habit.target} {habit.unit}
                  </p>
                  <p className="text-sm text-muted-foreground">Current streak: {habit.streak} days</p>
                </div>
                <HabitProgressRing
                  progress={habit.progress}
                  target={habit.target}
                  size={60}
                  strokeWidth={5}
                  completed={habit.completed}
                />
              </div>
              <div className="mt-4">
                <Label htmlFor={`progress-${habit.id}`}>Progress</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    id={`progress-${habit.id}`}
                    type="number"
                    min="0"
                    max={habit.target}
                    value={habit.progress}
                    onChange={(e) => handleUpdateProgress(habit.id, Number.parseInt(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">/ {habit.target}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`complete-${habit.id}`}
                  checked={habit.completed}
                  onCheckedChange={() => handleToggleComplete(habit.id)}
                />
                <label
                  htmlFor={`complete-${habit.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mark as completed
                </label>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {editingHabit && (
        <Dialog open={!!editingHabit} onOpenChange={(open) => !open && setEditingHabit(null)}>
          <DialogContent>
            <HabitForm habit={editingHabit} onSubmit={handleEditHabit} onCancel={() => setEditingHabit(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

type HabitFormProps = {
  habit?: Habit
  onSubmit: (habit: any) => void
  onCancel: () => void
}

function HabitForm({ habit, onSubmit, onCancel }: HabitFormProps) {
  const [name, setName] = useState(habit?.name || "")
  const [description, setDescription] = useState(habit?.description || "")
  const [icon, setIcon] = useState(habit?.icon || "code")
  const [target, setTarget] = useState(habit?.target || 30)
  const [unit, setUnit] = useState(habit?.unit || "minutes")
  const [frequency, setFrequency] = useState(habit?.frequency || "daily")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) return

    const habitData = {
      ...(habit && { id: habit.id, progress: habit.progress, streak: habit.streak, completed: habit.completed }),
      name,
      description,
      icon,
      target,
      unit,
      frequency,
    }

    onSubmit(habitData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{habit ? "Edit Habit" : "Create a New Habit"}</DialogTitle>
        <DialogDescription>
          {habit ? "Make changes to your habit here." : "Add a new habit to track your progress."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Daily Coding"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Write code every day to build consistency"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="icon">Icon</Label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger id="icon">
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="book">Book</SelectItem>
                <SelectItem value="coffee">Coffee</SelectItem>
                <SelectItem value="brain">Brain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="target">Target</Label>
            <Input
              id="target"
              type="number"
              min="1"
              value={target}
              onChange={(e) => setTarget(Number.parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="unit">Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger id="unit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="problems">Problems</SelectItem>
                <SelectItem value="pages">Pages</SelectItem>
                <SelectItem value="breaks">Breaks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{habit ? "Save Changes" : "Create Habit"}</Button>
      </DialogFooter>
    </form>
  )
}

