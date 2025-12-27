import { useState } from "react"
import { PageHeader } from "../../Components/page-header"
import { TabNavigation } from "../../Components/tab-navigation"
import { CardWrapper } from "../../Components/card-wrapper"
import { SettingsForm } from "../../Components/settings-form"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile Settings" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
    { id: "preferences", label: "Preferences" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <CardWrapper title="Profile Settings" description="Update your profile information and contact details">
            <SettingsForm />
          </CardWrapper>
        )

      case "notifications":
        return (
          <CardWrapper title="Notification Preferences" description="Choose how you want to be notified about updates">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Project Submissions</h4>
                  <p className="text-sm text-gray-600">Get notified when students submit projects</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Messages</h4>
                  <p className="text-sm text-gray-600">Get notified about new messages</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </CardWrapper>
        )

      case "security":
        return (
          <CardWrapper title="Security Settings" description="Manage your password and security preferences">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Change Password</h4>
                <div className="space-y-2">
                  <input type="password" placeholder="Current Password" className="w-full p-2 border rounded" />
                  <input type="password" placeholder="New Password" className="w-full p-2 border rounded" />
                  <input type="password" placeholder="Confirm New Password" className="w-full p-2 border rounded" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </CardWrapper>
        )

      case "preferences":
        return (
          <CardWrapper title="Application Preferences" description="Customize your dashboard experience">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Language</h4>
                <select className="w-full p-2 border rounded">
                  <option>English</option>
                  <option>Urdu</option>
                </select>
              </div>
              <div>
                <h4 className="font-medium mb-2">Time Zone</h4>
                <select className="w-full p-2 border rounded">
                  <option>Pakistan Standard Time (PST)</option>
                  <option>UTC</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </CardWrapper>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account settings and preferences" />

      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent()}
      </TabNavigation>
    </div>
  )
}
