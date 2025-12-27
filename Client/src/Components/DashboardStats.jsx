import { Card, CardContent, CardHeader, CardTitle } from "./Card"

export function DashboardStats() {
  const stats = [
    { title: "Total Students", value: "2,847", change: "+12%", icon: "👥" },
    { title: "Active Courses", value: "156", change: "+8%", icon: "📚" },
    { title: "Instructors", value: "89", change: "+3%", icon: "👨‍🏫" },
    { title: "Revenue", value: "$45,231", change: "+15%", icon: "💰" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <span className="text-2xl">{stat.icon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
