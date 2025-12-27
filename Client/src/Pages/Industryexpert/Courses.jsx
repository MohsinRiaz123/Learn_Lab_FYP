import { CoursesList } from "../../Components/courses-list"
import { CourseStats } from "../../Components/course-stats"

export default function Courses() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-gray-600">Courses you are assigned to evaluate and provide expertise</p>
      </div>

      <CourseStats />
      <CoursesList />
    </div>
  )
}
