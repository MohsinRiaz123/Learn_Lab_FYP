import { useState } from "react"
import { PageHeader } from "../../Components/page-header"
import { TabNavigation } from "../../Components/tab-navigation"
import { FeedbackList } from "../../Components/feedback-list"

export default function Feedback() {
  const [activeTab, setActiveTab] = useState("pending")

  const tabs = [
    { id: "pending", label: "Pending Feedback (12)" },
    { id: "completed", label: "Completed (28)" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learner Feedback"
        description="Provide feedback to learners on their projects and assignments"
      />

      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        <FeedbackList status={activeTab} />
      </TabNavigation>
    </div>
  )
}
