import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const LearningScreen = () => {
  const videoRef = useRef(null);
  const location = useLocation();

  const [videoCompleted, setVideoCompleted] = useState(false);
  const [watchedTime, setWatchedTime] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0); // ⭐ Feedback state

  const COURSE_ID = "course123";

  const [courseDetails, setCourseDetails] = useState({
    id: COURSE_ID,
    title: "Effective Team Communication",
    instructor: "David Miller",
    tags: ["Communication", "Teamwork", "Soft Skills"],
    description:
      "This course helps students develop practical communication strategies to work effectively within a team environment.",
    VIDEO_PROGRESS_KEY: `video_progress_${COURSE_ID}`,
    STATUS_KEY: `course_status_${COURSE_ID}`,
    courseStatus: "incomplete",
    score: 0,
  });

  const questions = [
    {
      id: 1,
      question: "What is the main purpose of this course?",
      options: [
        "Design UI",
        "Solve team conflicts",
        "Learn Laravel",
        "Test applications",
      ],
      correct: "Solve team conflicts",
    },
    {
      id: 2,
      question: "Who is the course instructor?",
      options: ["David Miller", "John Doe", "Jane Smith", "Alan Walker"],
      correct: "David Miller",
    },
    {
      id: 3,
      question: "Which of the following is a communication barrier?",
      options: [
        "Active listening",
        "Distractions",
        "Clarifying questions",
        "Feedback",
      ],
      correct: "Distractions",
    },
    {
      id: 4,
      question: "Which is a good practice in team communication?",
      options: [
        "Interrupting",
        "Ignoring feedback",
        "Assuming",
        "Active listening",
      ],
      correct: "Active listening",
    },
    {
      id: 5,
      question: "Which method is best for resolving team conflict?",
      options: [
        "Avoiding",
        "Yelling",
        "Constructive dialogue",
        "Blaming others",
      ],
      correct: "Constructive dialogue",
    },
    {
      id: 6,
      question: "Body language is a part of:",
      options: [
        "Written Communication",
        "Verbal Communication",
        "Non-verbal Communication",
        "Digital Messaging",
      ],
      correct: "Non-verbal Communication",
    },
    {
      id: 7,
      question: "Which is an example of poor communication?",
      options: [
        "Asking questions",
        "Not responding",
        "Clarifying doubts",
        "Using polite tone",
      ],
      correct: "Not responding",
    },
    {
      id: 8,
      question: "Which tool is useful for remote team communication?",
      options: ["Slack", "Notepad", "Calculator", "Excel"],
      correct: "Slack",
    },
    {
      id: 9,
      question: "Empathy in communication means:",
      options: [
        "Ignoring feelings",
        "Understanding others' feelings",
        "Debating",
        "Commanding",
      ],
      correct: "Understanding others' feelings",
    },
    {
      id: 10,
      question: "Why is feedback important?",
      options: [
        "To ignore issues",
        "To improve communication",
        "To punish others",
        "To end conversations",
      ],
      correct: "To improve communication",
    },
  ];

  const saveVideoProgress = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      localStorage.setItem(courseDetails.VIDEO_PROGRESS_KEY, time);
    }
  };

  useEffect(() => {
    const savedTime = localStorage.getItem(courseDetails.VIDEO_PROGRESS_KEY);
    const savedStatus = localStorage.getItem(courseDetails.STATUS_KEY);

    if (savedTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(savedTime);
      setWatchedTime(parseFloat(savedTime));
    }

    if (savedStatus) {
      setCourseDetails((prev) => ({
        ...prev,
        courseStatus: savedStatus,
      }));
    }

    const interval = setInterval(() => {
      if (videoRef.current) {
        setWatchedTime(videoRef.current.currentTime);
      }
    }, 1000);

    const handleBeforeUnload = () => saveVideoProgress();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveVideoProgress();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      saveVideoProgress();
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [location.pathname]);

  const handlePause = () => {
    saveVideoProgress();
  };

  const handleVideoEnd = () => {
    setVideoCompleted(true);
    localStorage.removeItem(courseDetails.VIDEO_PROGRESS_KEY);
  };

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    if (feedbackRating === 0) return;

    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });

    const percentage = (correctCount / questions.length) * 100;
    const newStatus = percentage >= 70 ? "completed" : "incomplete";

    setCourseDetails((prev) => {
      const updated = {
        ...prev,
        score: correctCount,
        courseStatus: newStatus,
      };
      localStorage.setItem(prev.STATUS_KEY, newStatus);
      return updated;
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Course Info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{courseDetails.title}</h1>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Instructor:</span>{" "}
          {courseDetails.instructor}
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          {courseDetails.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-1">{courseDetails.description}</p>
      </div>

      <p className="text-md text-red-500 mt-4">
        * Please pause the video before changing the webpage to ensure progress
        is saved.
      </p>

      {/* Video */}
      <div className="aspect-w-16 aspect-h-9 mb-6">
        <video
          ref={videoRef}
          controls
          onEnded={handleVideoEnd}
          onPause={handlePause}
          className="rounded-lg w-full shadow"
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      {!videoCompleted && (
        <span className="text-xl font-bold mb-2 bg-yellow-300 p-1 block text-center">
          Quiz will appear below after end of the video
        </span>
      )}
      {/* Quiz + Feedback */}
      {videoCompleted && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Quiz</h3>
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className=" flex  font-medium mb-2"><span className="mr-2">{q.id}:</span>{q.question}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {q.options.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={() => handleOptionChange(q.id, option)}
                      disabled={submitted}
                      className="mr-1"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* ⭐ Feedback Section */}
          <div className="my-6">
            <label className="block font-medium mb-2">Rate this course:</label>
            <div className="flex gap-2 text-yellow-500 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => !submitted && setFeedbackRating(star)}
                  className={`cursor-pointer ${
                    feedbackRating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            {feedbackRating === 0 && !submitted && (
              <p className="text-sm text-red-500 mt-2">
                Please provide a rating before submitting the quiz.
              </p>
            )}
          </div>

          {/* Submit button */}
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={feedbackRating === 0}
              className={`${
                feedbackRating === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white px-4 py-2 rounded transition`}
            >
              Submit Quiz
            </button>
          ) : (
            <div className="mt-4 text-green-600 font-semibold">
              You scored {courseDetails.score} out of {questions.length} (
              {Math.floor((courseDetails.score / questions.length) * 100)}%){" "}
              <br />
              Thank you for rating: {feedbackRating} ⭐
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearningScreen;
