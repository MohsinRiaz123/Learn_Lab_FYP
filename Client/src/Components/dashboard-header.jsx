export function DashboardHeader({ name, role, avatarUrl }) {
  return (
    <div className="bg-indigo-600 text-white overflow-hidden rounded-lg">
      <div className="p-6 flex items-center gap-6">
        <div className="h-20 w-20 bg-indigo-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-indigo-500 text-xs px-2 py-1 rounded-full">{role}</span>
            <span className="text-indigo-200 text-sm">•</span>
            <span className="text-indigo-200 text-sm">5 Courses Assigned</span>
          </div>
        </div>
      </div>
    </div>
  )
}
