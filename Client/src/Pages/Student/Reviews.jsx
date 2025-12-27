import React, { useState } from "react";
import { FaStar, FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles

const initialReviews = [
  {
    id: 1,
    course: "The Complete for Beginners",
    instructor: "Zoya Bilal",
    rating: 5,
    feedback: "Good",
  },
  {
    id: 2,
    course: "The Complete Graphic Design for Beginners",
    instructor: "Bob",
    rating: 4,
    feedback: "Great!",
  },
  {
    id: 3,
    course: "Graphic Design for Beginners",
    instructor: "Alice",
    rating: 3,
    feedback: "Average",
  },
  {
    id: 4,
    course: "The Complete Graphic Design",
    instructor: "Harry",
    rating: 5,
    feedback: "Good",
  },
  {
    id: 5,
    course: "The Design for Beginners",
    instructor: "Zoya Bilal",
    rating: 4,
    feedback: "Great!",
  },
  {
    id: 6,
    course: "The Complete Graphic for Beginners",
    instructor: "Bob",
    rating: 3,
    feedback: "Average",
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [editingId, setEditingId] = useState(null);
  const [editFeedback, setEditFeedback] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [deleteId, setDeleteId] = useState(null); // Store the id of the review to delete

  // Start editing
  const handleEdit = (review) => {
    setEditingId(review.id);
    setEditFeedback(review.feedback);
    setEditRating(review.rating);
  };

  // Save changes
  const handleSave = () => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === editingId
          ? { ...review, feedback: editFeedback, rating: editRating }
          : review
      )
    );
    toast.success("Review saved successfully!"); // Success toast
    setEditingId(null);
    setEditFeedback("");
    setEditRating(0);
  };

  // Show the delete confirmation modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true); // Show the modal
  };

  // Delete review
  const handleDelete = () => {
    setReviews((prev) => prev.filter((review) => review.id !== deleteId));
    toast.success("Review deleted successfully!"); // Success toast
    setShowModal(false); // Close the modal
    setDeleteId(null); // Reset deleteId
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
    setDeleteId(null); // Reset deleteId
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow w-[80%] mx-auto">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
              <th className="py-3 px-6">Course & Instructor</th>
              <th className="py-3 px-6">Feedback</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, idx) => (
              <tr
                key={review.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900 ">
                  <span>{review.course}</span>
                  <span className="flex " >  <p className="font-bold mr-2">Instructor:</p> {review.instructor}</span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {editingId === review.id ? (
                    <>
                      <div className="flex space-x-1 mb-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <FaStar
                            key={num}
                            onClick={() => setEditRating(num)}
                            className={`cursor-pointer ${
                              num <= editRating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <input
                        value={editFeedback}
                        onChange={(e) => setEditFeedback(e.target.value)}
                        className="border px-2 py-1 w-full rounded text-sm"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <div className="text-gray-700">{review.feedback}</div>
                    </>
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-4">
                    {editingId === review.id ? (
                      <button
                        className="bg-green-100 text-green-700 px-3 py-2 rounded-full hover:bg-green-200"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="text-purple-600 px-3 py-2 rounded-full hover:bg-purple-600 hover:text-white"
                          onClick={() => handleEdit(review)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 px-3 py-2 rounded-full hover:bg-red-600 hover:text-white"
                          onClick={() => handleDeleteClick(review.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No reviews available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer position="top-center" />

      {/* Delete Confirmation Modal with blurred background */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50 ">
          <div className="bg-white p-6 rounded-xl shadow-lg w-1/3 border border-purple">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this review?
            </h3>
            <div className="flex justify-around">
              <button
                onClick={handleCancelDelete}
                className="bg-purple text-white px-4 py-2 rounded-lg "
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
