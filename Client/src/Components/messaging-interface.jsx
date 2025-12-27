import { useState } from "react"
import { MdSend, MdAttachFile } from "react-icons/md"

export function MessagingInterface() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [message, setMessage] = useState("")

  const chats = [
    {
      id: 1,
      name: "Muhammad Ali",
      lastMessage: "Thank you for the feedback!",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Fatima Khan",
      lastMessage: "I have a question about React hooks",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Hassan Ahmed",
      lastMessage: "Could you review my project?",
      time: "2 days ago",
      unread: 1,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Muhammad Ali",
      content: "Hi! I have a question about the JavaScript project feedback.",
      time: "10:25 AM",
      isUser: false,
    },
    {
      id: 2,
      sender: "You",
      content: "What specific part would you like me to clarify?",
      time: "10:27 AM",
      isUser: true,
    },
    {
      id: 3,
      sender: "Muhammad Ali",
      content: "Thank you for the feedback!",
      time: "10:30 AM",
      isUser: false,
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm h-96 flex">
      {/* Chat List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Messages</h3>
        </div>
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedChat === chat.id ? "bg-indigo-50" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium">{chat.name}</h4>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{chat.time}</span>
                  {chat.unread > 0 && (
                    <div className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Muhammad Ali</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.isUser ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs opacity-75">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button onClick={() => {}} className="p-2 text-gray-500 hover:text-gray-700">
              <MdAttachFile className="h-5 w-5" />
            </button>
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <MdSend className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
