import { MdAssignment, MdStar, MdPeople } from "react-icons/md"

export function ProfileStats() {
  const stats = [
    {
      title: "Projects Reviewed",
      value: "42",
      icon: MdAssignment,
      color: "text-blue-500",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: MdStar,
      color: "text-yellow-500",
    },
    {
      title: "Students Mentored",
      value: "33",
      icon: MdPeople,
      color: "text-green-500",
    },
  ]

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Statistics</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-sm text-gray-600">{stat.title}</span>
            </div>
            <span className="font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
