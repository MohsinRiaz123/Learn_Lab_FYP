export function ExpertiseAreas() {
  const areas = ["React.js", "JavaScript", "Node.js", "Web Development", "UI/UX Design"]

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Expertise Areas</h2>
      <div className="flex flex-wrap gap-2">
        {areas.map((area, index) => (
          <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
            {area}
          </span>
        ))}
      </div>
    </div>
  )
}
