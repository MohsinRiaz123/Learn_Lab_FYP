const Student = require('../models/Student');
const Course = require('../models/Course');
const Instructor = require('../models/Instructor');

exports.getStats = async (req, res) => {
  try {
    // Get total counts
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalInstructors = await Instructor.countDocuments();

    // Get enrollment stats
    const enrollmentStats = await Course.aggregate([
      {
        $group: {
          _id: null,
          totalEnrollments: { $sum: { $size: '$enrolledStudents' } },
          totalCompletions: { $sum: { $size: '$completedStudents' } }
        }
      }
    ]);

    // Get top performing courses
    const topCourses = await Course.find()
      .sort({ rating: -1 })
      .limit(5)
      .populate('instructor', 'name')
      .select('name rating enrolledStudents completedStudents');

    // Calculate completion rate
    const completionRate = enrollmentStats[0] 
      ? ((enrollmentStats[0].totalCompletions / enrollmentStats[0].totalEnrollments) * 100).toFixed(2)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalCourses,
        totalInstructors,
        totalEnrollments: enrollmentStats[0]?.totalEnrollments || 0,
        totalCompletions: enrollmentStats[0]?.totalCompletions || 0,
        completionRate: parseFloat(completionRate),
        topCourses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};