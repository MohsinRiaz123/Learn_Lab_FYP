import { DashboardStats } from "../../components/DashboardStats"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card"

const DashboardPage = () => {
  return (
   <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">New student enrolled in React Course</span>
                <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Course "Python Basics" approved</span>
                <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">New instructor application received</span>
                <span className="text-xs text-gray-500 ml-auto">10 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-medium">Add Course</div>
                <div className="text-sm text-gray-600">Create new course</div>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl mb-2">👥</div>
                <div className="font-medium">Manage Users</div>
                <div className="text-sm text-gray-600">View all users</div>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium">View Reports</div>
                <div className="text-sm text-gray-600">Generate reports</div>
              </button>
              <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-medium">Settings</div>
                <div className="text-sm text-gray-600">System settings</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage

