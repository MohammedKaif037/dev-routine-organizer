"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { Bell, Lock, Eye, Monitor, Moon, Sun, Globe, Save } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const { user } = useAuth()

  const [accountSettings, setAccountSettings] = useState({
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    habitReminders: true,
    goalReminders: true,
    achievementNotifications: true,
    communityUpdates: false,
    weeklyReports: true,
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    fontSize: "medium",
    colorScheme: "blue",
    reducedMotion: false,
    compactMode: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showActivity: true,
    showAchievements: true,
    showStats: true,
    allowMentions: true,
  })

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleAppearanceChange = (key: string, value: any) => {
    setAppearanceSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveAccount = () => {
    toast({
      title: "Account settings saved",
      description: "Your account settings have been updated successfully.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    })
  }

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated.",
    })
  }

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy settings saved",
      description: "Your privacy settings have been updated.",
    })
  }

  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details and manage your email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={accountSettings.email}
                  onChange={handleAccountChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAccount}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={accountSettings.currentPassword}
                  onChange={handleAccountChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={accountSettings.newPassword}
                  onChange={handleAccountChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={accountSettings.confirmPassword}
                  onChange={handleAccountChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAccount}>
                <Lock className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible actions that affect your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-destructive/50 p-4">
                <h3 className="text-lg font-medium">Delete Account</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Once you delete your account, there is no going back. All your data will be permanently removed.
                </p>
                <Button variant="destructive" className="mt-4">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Delivery Methods</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="habitReminders">Habit Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded about your daily habits</p>
                  </div>
                  <Switch
                    id="habitReminders"
                    checked={notificationSettings.habitReminders}
                    onCheckedChange={(checked) => handleNotificationChange("habitReminders", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="goalReminders">Goal Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded about upcoming goal deadlines</p>
                  </div>
                  <Switch
                    id="goalReminders"
                    checked={notificationSettings.goalReminders}
                    onCheckedChange={(checked) => handleNotificationChange("goalReminders", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="achievementNotifications">Achievement Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you earn achievements</p>
                  </div>
                  <Switch
                    id="achievementNotifications"
                    checked={notificationSettings.achievementNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("achievementNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="communityUpdates">Community Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about community activities and discussions
                    </p>
                  </div>
                  <Switch
                    id="communityUpdates"
                    checked={notificationSettings.communityUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("communityUpdates", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weeklyReports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summaries of your progress</p>
                  </div>
                  <Switch
                    id="weeklyReports"
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>
                <Bell className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how DevHabit looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:border-primary ${
                      appearanceSettings.theme === "light" ? "border-primary" : "border-border"
                    }`}
                    onClick={() => handleAppearanceChange("theme", "light")}
                  >
                    <Sun className="mb-2 h-6 w-6" />
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:border-primary ${
                      appearanceSettings.theme === "dark" ? "border-primary" : "border-border"
                    }`}
                    onClick={() => handleAppearanceChange("theme", "dark")}
                  >
                    <Moon className="mb-2 h-6 w-6" />
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:border-primary ${
                      appearanceSettings.theme === "system" ? "border-primary" : "border-border"
                    }`}
                    onClick={() => handleAppearanceChange("theme", "system")}
                  >
                    <Monitor className="mb-2 h-6 w-6" />
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Font Size</h3>
                <div className="grid gap-2">
                  <Label htmlFor="fontSize">Select Font Size</Label>
                  <Select
                    value={appearanceSettings.fontSize}
                    onValueChange={(value) => handleAppearanceChange("fontSize", value)}
                  >
                    <SelectTrigger id="fontSize">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Color Scheme</h3>
                <div className="grid gap-2">
                  <Label htmlFor="colorScheme">Select Color Scheme</Label>
                  <Select
                    value={appearanceSettings.colorScheme}
                    onValueChange={(value) => handleAppearanceChange("colorScheme", value)}
                  >
                    <SelectTrigger id="colorScheme">
                      <SelectValue placeholder="Select color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Accessibility</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reducedMotion">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">Minimize animations throughout the app</p>
                  </div>
                  <Switch
                    id="reducedMotion"
                    checked={appearanceSettings.reducedMotion}
                    onCheckedChange={(checked) => handleAppearanceChange("reducedMotion", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compactMode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing to fit more content on screen</p>
                  </div>
                  <Switch
                    id="compactMode"
                    checked={appearanceSettings.compactMode}
                    onCheckedChange={(checked) => handleAppearanceChange("compactMode", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAppearance}>
                <Eye className="mr-2 h-4 w-4" />
                Save Appearance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control who can see your activity and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Visibility</h3>
                <div className="grid gap-2">
                  <Label htmlFor="profileVisibility">Who can see your profile</Label>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                  >
                    <SelectTrigger id="profileVisibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Everyone)</SelectItem>
                      <SelectItem value="community">Community Members Only</SelectItem>
                      <SelectItem value="connections">Connections Only</SelectItem>
                      <SelectItem value="private">Private (Only Me)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Activity Visibility</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showActivity">Show Activity</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your coding activity</p>
                  </div>
                  <Switch
                    id="showActivity"
                    checked={privacySettings.showActivity}
                    onCheckedChange={(checked) => handlePrivacyChange("showActivity", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showAchievements">Show Achievements</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your achievements</p>
                  </div>
                  <Switch
                    id="showAchievements"
                    checked={privacySettings.showAchievements}
                    onCheckedChange={(checked) => handlePrivacyChange("showAchievements", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showStats">Show Statistics</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your coding statistics</p>
                  </div>
                  <Switch
                    id="showStats"
                    checked={privacySettings.showStats}
                    onCheckedChange={(checked) => handlePrivacyChange("showStats", checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Community Interactions</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowMentions">Allow Mentions</Label>
                    <p className="text-sm text-muted-foreground">Allow other users to mention you in comments</p>
                  </div>
                  <Switch
                    id="allowMentions"
                    checked={privacySettings.allowMentions}
                    onCheckedChange={(checked) => handlePrivacyChange("allowMentions", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePrivacy}>
                <Globe className="mr-2 h-4 w-4" />
                Save Privacy Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

