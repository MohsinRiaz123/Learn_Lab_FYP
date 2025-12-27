import { MessagingInterface } from "../../Components/messaging-interface"

export default function Messages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-gray-600">Chat with your assigned learners</p>
      </div>

      <MessagingInterface />
    </div>
  )
}
