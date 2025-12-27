import { useState } from "react"
import { PageHeader } from "../../Components/page-header"
import { TabNavigation } from "../../Components/tab-navigation"
import { ProjectEvaluationList } from "../../Components/project-evaluation-list"

export default function Projects() {
  const [activeTab, setActiveTab] = useState("pending")

  const tabs = [
    { id: "pending", label: "Pending (12)" },
    { id: "inProgress", label: "In Progress (5)" },
    { id: "completed", label: "Completed (42)" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Project Evaluations" description="Review and provide feedback on learner projects" />

      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        <ProjectEvaluationList status={activeTab} />
      </TabNavigation>
    </div>
  )
}
