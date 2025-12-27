import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { Label } from "../../components/Label"
import { Textarea } from "../../components/Textarea"
import { Switch } from "../../components/Switch"
import React from 'react'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "Learning Platform",
    siteDescription: "A comprehensive online learning platform",
    adminEmail: "admin@example.com",
    allowRegistration: true,
    requireEmailVerification: true,
    enableNotifications: true,
    maintenanceMode: false,
  })

  const handleInputChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log("Settings saved:", settings)
    alert("Settings saved successfully!")
  }

  const handleReset = () => {
    setSettings({
      siteName: "Learning Platform",
      siteDescription: "A comprehensive online learning platform",
      adminEmail: "admin@example.com",
      allowRegistration: true,
      requireEmailVerification: true,
      enableNotifications: true,
      maintenanceMode: false,
    })
    console.log("Settings reset to defaults")
  }

  return (
   <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure your platform settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => handleInputChange("siteName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => handleInputChange("siteDescription", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input
              id="adminEmail"
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleInputChange("adminEmail", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow User Registration</Label>
              <div className="text-sm text-gray-600">Allow new users to register</div>
            </div>
            <Switch
              checked={settings.allowRegistration}
              onCheckedChange={(value) => handleInputChange("allowRegistration", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require Email Verification</Label>
              <div className="text-sm text-gray-600">Users must verify their email</div>
            </div>
            <Switch
              checked={settings.requireEmailVerification}
              onCheckedChange={(value) => handleInputChange("requireEmailVerification", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Notifications</Label>
              <div className="text-sm text-gray-600">System-wide notifications</div>
            </div>
            <Switch
              checked={settings.enableNotifications}
              onCheckedChange={(value) => handleInputChange("enableNotifications", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <div className="text-sm text-gray-600">Put site in maintenance mode</div>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(value) => handleInputChange("maintenanceMode", value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  )
}

export default SettingsPage


