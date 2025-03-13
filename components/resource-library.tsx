"use client"

import { ExternalLink, BookOpen, Code, Video, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

type Resource = {
  id: string
  title: string
  description: string
  url: string
  type: "article" | "tutorial" | "video" | "documentation"
  tags: string[]
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "React Hooks: A Complete Guide",
    description: "Learn everything about React hooks and how to use them effectively",
    url: "https://example.com/react-hooks",
    type: "article",
    tags: ["React", "Hooks", "Frontend"],
  },
  {
    id: "2",
    title: "Building a Full-Stack App with Next.js",
    description: "Step-by-step tutorial for creating a complete web application",
    url: "https://example.com/nextjs-tutorial",
    type: "tutorial",
    tags: ["Next.js", "Full-Stack", "React"],
  },
  {
    id: "3",
    title: "Advanced TypeScript Patterns",
    description: "Deep dive into TypeScript's advanced features and patterns",
    url: "https://example.com/typescript-patterns",
    type: "documentation",
    tags: ["TypeScript", "Advanced"],
  },
  {
    id: "4",
    title: "Mastering CSS Grid Layout",
    description: "Comprehensive video course on CSS Grid layout techniques",
    url: "https://example.com/css-grid",
    type: "video",
    tags: ["CSS", "Layout", "Frontend"],
  },
]

export function ResourceLibrary() {
  const getIconByType = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />
      case "tutorial":
        return <Code className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "documentation":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-3">
      {mockResources.map((resource) => (
        <div key={resource.id} className="rounded-lg border p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                {getIconByType(resource.type)}
              </div>
              <div>
                <h3 className="font-medium">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Open resource</span>
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

