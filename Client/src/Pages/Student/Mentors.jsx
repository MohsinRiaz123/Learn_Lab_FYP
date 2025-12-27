import React, { useState } from "react";

const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    course: "React Mastery",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "David Miller",
    course: "Node.js Essentials",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    id: 3,
    name: "Fatima Noor",
    course: "UI Design Basics",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

// 🟨 Add old messages per mentor
const initialMessages = {
  1: [
    {
      text: "Hi Sarah, I completed the first module!",
      sender: "you",
      time: "10:30 AM",
    },
    {
      text: "Great! Let me know if you have any questions.",
      sender: "mentor",
      time: "10:35 AM",
    },
  ],
  2: [
    {
      text: "Hi David, I'm stuck on Express routing.",
      sender: "you",
      time: "Yesterday",
    },
    {
      text: "Try revisiting the route middleware section.",
      sender: "mentor",
      time: "Yesterday",
    },
  ],
  3: [
    {
      text: "Ma'am, how to choose color palettes for mobile UI?",
      sender: "you",
      time: "2 days ago",
    },
    {
      text: "Use contrast and brand colors. Start with 2-3 base colors.",
      sender: "mentor",
      time: "2 days ago",
    },
  ],
};

const Mentors = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || !selectedMentor) return;
    const newMessage = {
      text: input,
      sender: "you",
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedMentor.id]: [...(prev[selectedMentor.id] || []), newMessage],
    }));
    setInput("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-2 text-indigo-700">
        Talk to Your Mentor
      </h2>
      <p className="text-gray-600 mb-6">
        Select a mentor below to start a conversation and ask your
        course-related questions.
      </p>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className={`flex-shrink-0 cursor-pointer w-64 bg-white border rounded-lg shadow hover:shadow-lg transition-all p-4 ${
              selectedMentor?.id === mentor.id ? "border-indigo-500" : ""
            }`}
            onClick={() => setSelectedMentor(mentor)}
          >
            <div className="flex items-center gap-4">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">{mentor.name}</p>
                <p className="text-sm text-gray-500">
                  Teaches: {mentor.course}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMentor && (
        <div className="mt-6 flex gap-6">
          {/* Left Side: Mentor Info */}
          <div className="w-1/3 bg-white p-4 rounded-lg shadow h-fit">
            <h3 className="text-xl font-bold mb-2 text-indigo-600">
              Mentor Details
            </h3>
            <img
              src={selectedMentor.image}
              className="w-24 h-24 rounded-full mb-2"
              alt=""
            />
            <p className="text-lg font-medium">{selectedMentor.name}</p>
            <p className="text-gray-500">Course: {selectedMentor.course}</p>
          </div>

          {/* Right Side: Chat Box */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow flex flex-col h-[500px]">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              Chat with {selectedMentor.name}
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2 border p-2 rounded mb-4">
              {(messages[selectedMentor.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "you" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                      msg.sender === "you"
                        ? "bg-indigo-300 text-indigo-900"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[10px] text-right text-gray-500">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mentors;
