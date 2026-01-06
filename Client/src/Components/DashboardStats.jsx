import { Card, CardContent, CardHeader, CardTitle } from "./Card"

export function DashboardStats() {
  const stats = [
    { title: "Total Students", value: "2,847" },
    { title: "Active Courses", value: "156"},
    { title: "Instructors", value: "89"},
    { title: "Revenue", value: "45,231"},
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
           
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
