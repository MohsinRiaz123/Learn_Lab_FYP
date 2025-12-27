import { Link, useNavigate } from "react-router-dom"

export function RecentMessages() {
  const navigate = useNavigate()

  const messages = [
    {
      id: 1,
      sender: "Mohsin",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      message: "Hi, I have a question about the JavaScript project feedback...",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      sender: "Hussain",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      message: "Thank you for your detailed feedback on my React project!",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      sender: "Javed",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      message: "Could you clarify what you meant about the component structure?",
      time: "2 days ago",
      unread: false,
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
            <p className="text-sm text-gray-600">Chat with your assigned learners</p>
          </div>
          <Link to="/messages" className="text-sm text-indigo-600 hover:text-indigo-800">
            View All
          </Link>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 p-3 rounded-lg ${message.unread ? "bg-gray-50" : ""}`}
          >
            <div className="h-10 w-10 bg-indigo-400 rounded-full flex items-center justify-center text-white font-semibold">
              {message.sender
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{message.sender}</h4>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-sm truncate">{message.message}</p>
            </div>
            {message.unread && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
          </div>
        ))}
      </div>
      <div className="p-6 border-t">
        <Link to="/industoryExpert/messages" className="w-full">
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Open Messages
          </button>
        </Link>

        <button
          onClick={() => navigate("/messages")}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Open Messages
        </button>
      </div>
    </div>
  )
}
