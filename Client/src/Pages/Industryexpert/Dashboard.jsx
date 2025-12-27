import { DashboardHeader } from "../../Components/dashboard-header"
import { DashboardStats } from "../../Components/dashboard-stats"
import { ProjectsToReview } from "../../Components/projects-to-review"
import { RecentMessages } from "../../Components/recent-messages"
import { CourseRecommendations } from "../../Components/course-recommendations"

export default function Dashboard() {
  return (
    <div>
      <DashboardHeader name="Ahmad Bilal" role="Industry Expert" avatarUrl="/placeholder.svg?height=80&width=80" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <DashboardStats />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <div className="lg:col-span-2">
          <ProjectsToReview />
        </div>
        <div className="space-y-6">
          <RecentMessages />
          <CourseRecommendations />
        </div>
      </div>
    </div>
  )
}
