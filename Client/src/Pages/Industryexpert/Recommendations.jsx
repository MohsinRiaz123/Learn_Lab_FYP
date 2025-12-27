import { useState } from "react"
import { PageHeader } from "../../Components/page-header"
import { TabNavigation } from "../../Components/tab-navigation"
import { CardWrapper } from "../../Components/card-wrapper"
import { CourseRecommendationForm } from "../../Components/course-recommendation-form"
import { RecommendationsList } from "../../Components/recommendations-list"

export default function Recommendations() {
  const [activeTab, setActiveTab] = useState("recommendations")

  const tabs = [
    { id: "recommendations", label: "My Recommendations" },
    { id: "new", label: "New Recommendation" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Recommendations"
        description="Suggest improvements to courses based on industry trends"
      />

      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "recommendations" && <RecommendationsList />}
        {activeTab === "new" && (
          <CardWrapper
            title="Create New Recommendation"
            description="Suggest improvements or changes to course content based on your industry expertise"
          >
            <CourseRecommendationForm />
          </CardWrapper>
        )}
      </TabNavigation>
    </div>
  )
}
