import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card"
import { Switch } from "../../components/Switch"
import { Label } from "../../components/Label"
import { Button } from "../../components/Button"
import React from 'react'

const NotificationsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    courseUpdates: true,
    systemAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
  })

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    console.log(`${key} changed to ${value}`)
  }

  const handleSave = () => {
    console.log("Notification settings saved:", settings)
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-gray-600">Manage your notification preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <div className="text-sm text-gray-600">Receive notifications via email</div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(value) => handleSettingChange("emailNotifications", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Course Updates</Label>
              <div className="text-sm text-gray-600">Get notified about course changes</div>
            </div>
            <Switch
              checked={settings.courseUpdates}
              onCheckedChange={(value) => handleSettingChange("courseUpdates", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Alerts</Label>
              <div className="text-sm text-gray-600">Important system notifications</div>
            </div>
            <Switch
              checked={settings.systemAlerts}
              onCheckedChange={(value) => handleSettingChange("systemAlerts", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <div className="text-sm text-gray-600">Promotional and marketing content</div>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={(value) => handleSettingChange("marketingEmails", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <div className="text-sm text-gray-600">Weekly summary reports</div>
            </div>
            <Switch
              checked={settings.weeklyReports}
              onCheckedChange={(value) => handleSettingChange("weeklyReports", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <div className="text-sm text-gray-600">Receive push notifications in browser</div>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(value) => handleSettingChange("pushNotifications", value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  )
}

export default NotificationsPage


