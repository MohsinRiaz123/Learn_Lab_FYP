export function ListItem({ title, subtitle, metadata, priority, status, actions = [], className = "" }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
      case "Completed":
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending Review":
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={`bg-white p-6 rounded-lg border shadow-sm ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            {priority && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(priority)}`}>
                {priority}
              </span>
            )}
            {status && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>{status}</span>
            )}
          </div>
          {subtitle && <p className="text-gray-600 mb-2">{subtitle}</p>}
          {metadata && (
            <div className="space-y-1">
              {metadata.map((item, index) => (
                <p key={index} className="text-sm text-gray-500">
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
        {actions.length > 0 && (
          <div className="flex gap-2 ml-4">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${action.className || "border border-gray-300 hover:bg-gray-50"}`}
              >
                {action.icon && <action.icon className="h-4 w-4" />}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
