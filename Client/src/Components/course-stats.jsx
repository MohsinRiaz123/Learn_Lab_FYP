import { MdBook, MdPeople, MdAssignment } from "react-icons/md"

export function CourseStats() {
  const stats = [
    {
      title: "Total Courses",
      value: "5",
      icon: MdBook,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Students",
      value: "73",
      icon: MdPeople,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Assignments",
      value: "28",
      icon: MdAssignment,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
