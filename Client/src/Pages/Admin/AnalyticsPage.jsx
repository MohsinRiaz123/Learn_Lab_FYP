
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card"
const AnalyticsPage = () => {
   const metrics = [
    { title: "Total Revenue", value: "$125,430", change: "+12.5%", trend: "up" },
    { title: "Course Completions", value: "1,247", change: "+8.2%", trend: "up" },
    { title: "Active Users", value: "3,891", change: "+15.3%", trend: "up" },
    { title: "Avg. Session Time", value: "24m 32s", change: "-2.1%", trend: "down" },
  ]
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your platform performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.trend === "up" ? "📈" : "📉"}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs mt-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "React Development", students: 234, revenue: "$12,450" },
                { name: "Python Basics", students: 189, revenue: "$9,870" },
                { name: "Web Design", students: 156, revenue: "$8,230" },
                { name: "Machine Learning", students: 134, revenue: "$7,890" },
              ].map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-gray-600">{course.students} students</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{course.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">📊 Chart visualization would go here</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">2.8K</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">3.2K</div>
                  <div className="text-sm text-gray-600">Last Month</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">+14%</div>
                  <div className="text-sm text-gray-600">Growth</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AnalyticsPage

