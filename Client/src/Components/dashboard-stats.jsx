import { MdAssignment, MdPeople, MdBook } from "react-icons/md"

export function DashboardStats() {
  const stats = [
    {
      title: "Projects to Review",
      value: "12",
      icon: MdAssignment,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Learners",
      value: "33",
      icon: MdPeople,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      title: "Assigned Courses",
      value: "5",
      icon: MdBook,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <div className={`${stat.bgColor} p-2 rounded-full`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
        </div>
      ))}
    </>
  )
}
