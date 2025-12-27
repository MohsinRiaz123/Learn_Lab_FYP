import React, { useState } from "react";

// Updated quiz attempt data
const quizAttempts = [
  {
    id: 1,
    courseName: "React Mastery",
    student: "Ali Raza",
    questions: 10,
    correct: 7,
    incorrect: 3,
    result: "Pass",
  },
  {
    id: 2,
    courseName: "UI Design Basics",
    student: "Fatima Noor",
    questions: 10,
    correct: 8,
    incorrect: 2,
    result: "Pass",
  },
  {
    id: 15,
    courseName: "Node.js Essentials",
    student: "Yasir Mehmood",
    questions: 10,
    correct: 4,
    incorrect: 6,
    result: "Fail",
  },
  {
    id: 16,
    courseName: "React Mastery",
    student: "Hina Aslam",
    questions: 10,
    correct: 6,
    incorrect: 4,
    result: "Fail",
  },
  {
    id: 3,
    courseName: "Node.js Essentials",
    student: "Usman Khan",
    questions: 10,
    correct: 10,
    incorrect: 0,
    result: "Pass",
  },
  {
    id: 4,
    courseName: "React Mastery",
    student: "Sarah Ali",
    questions: 10,
    correct: 9,
    incorrect: 1,
    result: "Pass",
  },
  {
    id: 5,
    courseName: "UI Design Basics",
    student: "Ahsan Qureshi",
    questions: 10,
    correct: 7,
    incorrect: 3,
    result: "Pass",
  },
  {
    id: 6,
    courseName: "Node.js Essentials",
    student: "Mina Tariq",
    questions: 10,
    correct: 8,
    incorrect: 2,
    result: "Pass",
  },
  {
    id: 7,
    courseName: "React Mastery",
    student: "Zain Asif",
    questions: 10,
    correct: 9,
    incorrect: 1,
    result: "Pass",
  },
   {
    id: 17,
    courseName: "UI Design Basics",
    student: "Tariq Iqbal",
    questions: 10,
    correct: 5,
    incorrect: 5,
    result: "Fail",
  },
  {
    id: 18,
    courseName: "Node.js Essentials",
    student: "Emaan Khawar",
    questions: 10,
    correct: 3,
    incorrect: 7,
    result: "Fail",
  },
  {
    id: 8,
    courseName: "UI Design Basics",
    student: "Noor Shah",
    questions: 10,
    correct: 8,
    incorrect: 2,
    result: "Pass",
  },
  {
    id: 9,
    courseName: "Node.js Essentials",
    student: "Adeel Rafiq",
    questions: 10,
    correct: 7,
    incorrect: 3,
    result: "Pass",
  },
   {
    id: 19,
    courseName: "React Mastery",
    student: "Saba Ali",
    questions: 10,
    correct: 4,
    incorrect: 6,
    result: "Fail",
  },
  {
    id: 20,
    courseName: "UI Design Basics",
    student: "Zara Rehman",
    questions: 10,
    correct: 5,
    incorrect: 5,
    result: "Fail",
  },
  {
    id: 10,
    courseName: "React Mastery",
    student: "Iqra Javed",
    questions: 10,
    correct: 10,
    incorrect: 0,
    result: "Pass",
  },
  {
    id: 11,
    courseName: "UI Design Basics",
    student: "Bilal Haider",
    questions: 10,
    correct: 7,
    incorrect: 3,
    result: "Pass",
  },
  {
    id: 12,
    courseName: "Node.js Essentials",
    student: "Sana Zubair",
    questions: 10,
    correct: 8,
    incorrect: 2,
    result: "Pass",
  },
  {
    id: 13,
    courseName: "React Mastery",
    student: "Hassan Malik",
    questions: 10,
    correct: 6,
    incorrect: 4,
    result: "Fail",
  },
  {
    id: 14,
    courseName: "UI Design Basics",
    student: "Laiba Yousuf",
    questions: 10,
    correct: 5,
    incorrect: 5,
    result: "Fail",
  },
  
 
 
];

const QuizAttempt = () => {
  const [selectedCourse, setSelectedCourse] = useState("All");

  const courseOptions = [
    "All",
    ...Array.from(new Set(quizAttempts.map((q) => q.courseName))),
  ];

  const filteredAttempts =
    selectedCourse === "All"
      ? quizAttempts
      : quizAttempts.filter((q) => q.courseName === selectedCourse);

  return (
    <div className="p-6 bg-white rounded-lg shadow w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Course Quiz Attempts</h2>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border border-gray-500 rounded px-3 py-1 text-sm text-gray-700"
        >
          {courseOptions.map((course, idx) => (
            <option key={idx} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase">
              <th className="py-3 px-6">Course</th>
              <th className="py-3 px-6">Questions</th>
              <th className="py-3 px-6">Correct</th>
              <th className="py-3 px-6">Incorrect</th>
              <th className="py-3 px-6">Result</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttempts.length > 0 ? (
              filteredAttempts.map((quiz, idx) => (
                <tr
                  key={quiz.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-4 px-6">
                    <div className="text-gray-900 font-semibold">
                      {quiz.courseName}
                    </div>
                    <div className="text-gray-500 text-sm">
                      <span className="font-semibold text-black">Student:</span>{" "}
                      {quiz.student}
                    </div>
                  </td>
                  <td className="py-4 px-6">{quiz.questions}</td>
                  <td className="py-4 px-6">{quiz.correct}</td>
                  <td className="py-4 px-6">{quiz.incorrect}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No quiz attempts found for this course.
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
