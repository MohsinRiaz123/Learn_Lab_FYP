import React from "react";

const quizAttempts = [
  {
    id: 1,
    date: "January 20, 2024",
    question: "Write a short essay on yourself using the 5",
    student: "John Due",
    qus: 4,
    tm: 8,
    ca: 4,
    result: "Pass",
  },
  {
    id: 2,
    date: "January 20, 2024",
    question: "Write a short essay on yourself using the 5",
    student: "John Due",
    qus: 2,
    tm: 6,
    ca: 3,
    result: "Fail",
  },
  {
    id: 3,
    date: "January 20, 2024",
    question: "Write a short essay on yourself using the 5",
    student: "John Due",
    qus: 4,
    tm: 8,
    ca: 4,
    result: "Pass",
  },
  {
    id: 4,
    date: "January 20, 2024",
    question: "Write a short essay on yourself using the 5",
    student: "John Due",
    qus: 2,
    tm: 6,
    ca: 3,
    result: "Fail",
  },
  {
    id: 5,
    date: "January 20, 2024",
    question: "Write a short essay on yourself using the 5",
    student: "John Due",
    qus: 4,
    tm: 8,
    ca: 4,
    result: "Pass",
  },
  {
    id: 6,
    date: "January 20, 2024",
    question: "Write a short essay on yourself using the 5",
    student: "John Due",
    qus: 2,
    tm: 6,
    ca: 3,
    result: "Fail",
  },
];
const QuizAttempt = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow w-[90%] mx-auto">
      <h2 className="text-xl font-bold mb-4">My Quiz Attempts</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase">
              <th className="py-3 px-6">Quiz</th>
              <th className="py-3 px-6">Qus</th>
              <th className="py-3 px-6">TM</th>
              <th className="py-3 px-6">CA</th>
              <th className="py-3 px-6">Result</th>
            </tr>
          </thead>
          <tbody>
            {quizAttempts.map((quiz, idx) => (
              <tr
                key={quiz.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-4 px-6">
                  <div className="text-gray-700 font-medium">{quiz.date}</div>
                  <div className="text-gray-900 font-semibold">
                    {quiz.question}
                  </div>
                  <div className="text-gray-500 text-sm">
                    <span className="font-semibold text-black">Student:</span> {quiz.student}
                  </div>
                </td>
                <td className="py-4 px-6">{quiz.qus}</td>
                <td className="py-4 px-6">{quiz.tm}</td>
                <td className="py-4 px-6">{quiz.ca}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      quiz.result === "Pass"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {quiz.result}
                  </span>
                </td>
              </tr>
            ))}
            {quizAttempts.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No quiz attempts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizAttempt;
