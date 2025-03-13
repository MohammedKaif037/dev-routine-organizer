"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Github, Code, Calendar, Trello, Slack, Figma, Link2, Check, X } from "lucide-react"

type Integration = {
  id: string
  name: string
  description: string
  icon: string
  connected: boolean
  lastSync?: string
}

export function ProfileIntegrations() {
  const { toast } = useToast()

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "github",
      name: "GitHub",
      description: "Track your coding activity from GitHub repositories",
      icon: "github",
      connected: true,
      lastSync: "2025-03-13T10:30:00",
    },
    {
      id: "vscode",
      name: "VS Code",
      description: "Track your coding time and languages from VS Code",
      icon: "code",
      connected: false,
    },
    {
      id: "gcalendar",
      name: "Google Calendar",
      description: "Sync your coding sessions with Google Calendar",
      icon: "calendar",
      connected: true,
      lastSync: "2025-03-12T15:45:00",
    },
    {
      id: "trello",
      name: "Trello",
      description: "Import tasks and goals from Trello boards",
      icon: "trello",
      connected: false,
    },
    {
      id: "slack",
      name: "Slack",
      description: "Share achievements and progress with your team",
      icon: "slack",
      connected: false,
    },
    {
      id: "figma",
      name: "Figma",
      description: "Track design work as part of your development process",
      icon: "figma",
      connected: false,
    },
  ])

  const handleToggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((integration) => {
        if (integration.id === id) {
          const newConnected = !integration.connected

          toast({
            title: newConnected ? "Integration connected" : "Integration disconnected",
            description: `${integration.name} has been ${newConnected ? "connected" : "disconnected"} successfully.`,
          })

          return {
            ...integration,
            connected: newConnected,
            lastSync: newConnected ? new Date().toISOString() : undefined,
          }
        }
        return integration
      }),
    )
  }

  const handleSyncIntegration = (id: string) => {
    setIntegrations(
      integrations.map((integration) => {
        if (integration.id === id && integration.connected) {
          toast({
            title: "Integration synced",
            description: `${integration.name} has been synced successfully.`,
          })

          return {
            ...integration,
            lastSync: new Date().toISOString(),
          }
        }
        return integration
      }),
    )
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "github":
        return <Github className="h-5 w-5" />
      case "code":
        return <Code className="h-5 w-5" />
      case "calendar":
        return <Calendar className="h-5 w-5" />
      case "trello":
        return <Trello className="h-5 w-5" />
      case "slack":
        return <Slack className="h-5 w-5" />
      case "figma":
        return <Figma className="h-5 w-5" />
      default:
        return <Link2 className="h-5 w-5" />
    }
  }

  const formatLastSync = (timestamp?: string) => {
    if (!timestamp) return "Never"

    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {getIconComponent(integration.icon)}
                  </div>
                  <CardTitle className="text-base">{integration.name}</CardTitle>
                </div>
                <Badge variant={integration.connected ? "default" : "outline"}>
                  {integration.connected ? (
                    <>
                      <Check className="mr-1 h-3 w-3" /> Connected
                    </>
                  ) : (
                    <>
                      <X className="mr-1 h-3 w-3" /> Disconnected
                    </>
                  )}
                </Badge>
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last synced: {formatLastSync(integration.lastSync)}</span>
                <Switch
                  checked={integration.connected}
                  onCheckedChange={() => handleToggleIntegration(integration.id)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                disabled={!integration.connected}
                onClick={() => handleSyncIntegration(integration.id)}
              >
                Sync Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

