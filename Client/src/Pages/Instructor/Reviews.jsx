import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

// Dummy review data
const receivedReviews = [
  {
    id: 101,
    from: "John Doe",
    course: "UI Design Basics",
    rating: 5,
    feedback: "Excellent collaboration!",
  },
  {
    id: 102,
    from: "Jane Smith",
    course: "React Mastery",
    rating: 4,
    feedback: "Great effort!",
  },
  {
    id: 103,
    from: "Mike Taylor",
    course: "UI Design Basics",
    rating: 3,
    feedback: "Good but could improve some parts.",
  },
];

const Reviews = () => {
  const [selectedCourse, setSelectedCourse] = useState("All");

  // Get unique course names for dropdown
  const courseOptions = [
    "All",
    ...Array.from(new Set(receivedReviews.map((r) => r.course))),
  ];

  // Filter logic
  const filteredReviews =
    selectedCourse === "All"
      ? receivedReviews
      : receivedReviews.filter((r) => r.course === selectedCourse);

  return (
    <div className="p-6 bg-white rounded-lg shadow w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reviews</h2>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border border-gray-500 rounded px-3 py-1 text-sm text-gray-700 focus:outline-none"
        >
          {courseOptions.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
              <th className="py-3 px-6">Course</th>
              <th className="py-3 px-6">Student</th>
              <th className="py-3 px-6">Rating</th>
              <th className="py-3 px-6">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <tr key={review.id} className="bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-800">
                    {review.course}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{review.from}</td>
                  <td className="py-4 px-6">
                    <div className="flex text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{review.feedback}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No reviews found for this course.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
