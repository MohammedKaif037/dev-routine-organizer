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
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Plus, Target, Calendar, ArrowRight, Edit, Trash2 } from "lucide-react"

type Goal = {
  id: string
  title: string
  description: string
  category: string
  deadline: string
  progress: number
  steps: {
    id: string
    description: string
    completed: boolean
  }[]
}

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Learn React Hooks",
    description: "Master all React hooks including useState, useEffect, useContext, and custom hooks",
    category: "Learning",
    deadline: "2025-04-15",
    progress: 60,
    steps: [
      { id: "1-1", description: "Study useState and useEffect", completed: true },
      { id: "1-2", description: "Learn useContext and useReducer", completed: true },
      { id: "1-3", description: "Practice with useRef and useMemo", completed: false },
      { id: "1-4", description: "Create custom hooks", completed: false },
      { id: "1-5", description: "Build a project using hooks", completed: false },
    ],
  },
  {
    id: "2",
    title: "Complete 30 LeetCode Problems",
    description: "Solve 30 algorithm problems on LeetCode to improve problem-solving skills",
    category: "Practice",
    deadline: "2025-05-01",
    progress: 40,
    steps: [
      { id: "2-1", description: "Complete 10 easy problems", completed: true },
      { id: "2-2", description: "Complete 10 medium problems", completed: true },
      { id: "2-3", description: "Complete 10 hard problems", completed: false },
    ],
  },
  {
    id: "3",
    title: "Build a Full-Stack Project",
    description: "Create a complete web application with frontend, backend, and database",
    category: "Project",
    deadline: "2025-06-30",
    progress: 25,
    steps: [
      { id: "3-1", description: "Design the application architecture", completed: true },
      { id: "3-2", description: "Set up the backend with Node.js", completed: true },
      { id: "3-3", description: "Create the database schema", completed: false },
      { id: "3-4", description: "Develop the frontend with React", completed: false },
      { id: "3-5", description: "Implement authentication", completed: false },
      { id: "3-6", description: "Deploy the application", completed: false },
    ],
  },
]

export function GoalsList() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [open, setOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const { toast } = useToast()

  const handleAddGoal = (goal: Omit<Goal, "id" | "progress">) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      ...goal,
      progress: 0,
    }

    setGoals([...goals, newGoal])
    setOpen(false)

    toast({
      title: "Goal created",
      description: `${goal.title} has been added to your goals.`,
    })
  }

  const handleEditGoal = (updatedGoal: Goal) => {
    setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
    setEditingGoal(null)

    toast({
      title: "Goal updated",
      description: `${updatedGoal.title} has been updated.`,
    })
  }

  const handleDeleteGoal = (id: string) => {
    const goalToDelete = goals.find((g) => g.id === id)
    setGoals(goals.filter((goal) => goal.id !== id))

    toast({
      title: "Goal deleted",
      description: `${goalToDelete?.title} has been removed from your goals.`,
    })
  }

  const handleToggleStep = (goalId: string, stepId: string) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedSteps = goal.steps.map((step) =>
            step.id === stepId ? { ...step, completed: !step.completed } : step,
          )

          const completedSteps = updatedSteps.filter((step) => step.completed).length
          const progress = Math.round((completedSteps / updatedSteps.length) * 100)

          return {
            ...goal,
            steps: updatedSteps,
            progress,
          }
        }
        return goal
      }),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Goals</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <GoalForm onSubmit={handleAddGoal} onCancel={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <CardTitle>{goal.title}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => setEditingGoal(goal)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteGoal(goal.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{goal.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
                <span className="text-sm font-medium">{goal.category}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">Steps:</h4>
                <ul className="space-y-1">
                  {goal.steps.map((step) => (
                    <li key={step.id} className="flex items-start">
                      <input
                        type="checkbox"
                        id={`step-${step.id}`}
                        checked={step.completed}
                        onChange={() => handleToggleStep(goal.id, step.id)}
                        className="mt-1 mr-2"
                      />
                      <label
                        htmlFor={`step-${step.id}`}
                        className={`text-sm ${step.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {step.description}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {editingGoal && (
        <Dialog open={!!editingGoal} onOpenChange={(open) => !open && setEditingGoal(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <GoalForm goal={editingGoal} onSubmit={handleEditGoal} onCancel={() => setEditingGoal(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

type GoalFormProps = {
  goal?: Goal
  onSubmit: (goal: any) => void
  onCancel: () => void
}

function GoalForm({ goal, onSubmit, onCancel }: GoalFormProps) {
  const [title, setTitle] = useState(goal?.title || "")
  const [description, setDescription] = useState(goal?.description || "")
  const [category, setCategory] = useState(goal?.category || "Learning")
  const [deadline, setDeadline] = useState(goal?.deadline || "")
  const [steps, setSteps] = useState(goal?.steps || [{ id: "new-1", description: "", completed: false }])

  const handleAddStep = () => {
    setSteps([...steps, { id: `new-${Date.now()}`, description: "", completed: false }])
  }

  const handleRemoveStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const handleStepChange = (id: string, description: string) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, description } : step)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !deadline) return

    // Filter out empty steps
    const validSteps = steps.filter((step) => step.description.trim() !== "")

    const goalData = {
      ...(goal && { id: goal.id, progress: goal.progress }),
      title,
      description,
      category,
      deadline,
      steps: validSteps.map((step, index) => ({
        ...step,
        id: step.id.startsWith("new") ? `${Date.now()}-${index}` : step.id,
      })),
    }

    onSubmit(goalData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{goal ? "Edit Goal" : "Create a New Goal"}</DialogTitle>
        <DialogDescription>
          {goal ? "Make changes to your goal here." : "Add a new goal to track your progress."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Learn React Hooks"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your goal"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Learning">Learning</SelectItem>
                <SelectItem value="Practice">Practice</SelectItem>
                <SelectItem value="Project">Project</SelectItem>
                <SelectItem value="Career">Career</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label>Steps</Label>
            <Button type="button" variant="outline" size="sm" onClick={handleAddStep}>
              <Plus className="mr-1 h-3 w-3" />
              Add Step
            </Button>
          </div>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <Input
                  value={step.description}
                  onChange={(e) => handleStepChange(step.id, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                />
                {steps.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveStep(step.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{goal ? "Save Changes" : "Create Goal"}</Button>
      </DialogFooter>
    </form>
  )
}

