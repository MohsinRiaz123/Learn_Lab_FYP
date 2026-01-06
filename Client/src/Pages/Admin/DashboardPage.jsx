import { DashboardStats } from "../../components/DashboardStats"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card"
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
   <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      <DashboardStats />

      <div className="">

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => navigate("/Admin/courses")}>
                <div className="text-2xl mb-2">📚</div>
                <div className="font-medium">Manage Course</div>
                <div className="text-sm text-gray-600">View all courses</div>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={()=>navigate("/Admin/students")}>
                <div className="text-2xl mb-2">👥</div>
                <div className="font-medium">Manage Students</div>
                <div className="text-sm text-gray-600">View all students</div>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={()=>navigate("/Admin/instructors")}>
                <div className="text-2xl mb-2">👨‍🏫</div>
                <div className="font-medium">Manage Instructors</div>
                <div className="text-sm text-gray-600">View all instructors</div>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={()=>navigate("/Admin/industry-experts")}>
                <div className="text-2xl mb-2">💼</div>
                <div className="font-medium">Industry Experts</div>
                <div className="text-sm text-gray-600">View all industry experts</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage

