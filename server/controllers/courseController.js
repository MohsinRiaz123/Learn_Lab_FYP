const Course = require('../models/Course');

exports.getTopCourses = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const topCourses = await Course.find()
      .populate('instructor', 'name email specialization')
      .sort({ rating: -1, enrolledStudents: -1 })
      .limit(limit)
      .select('name image rating enrolledStudents completedStudents description duration price');

    // Add enrollment count to each course
    const coursesWithStats = topCourses.map(course => ({
      ...course.toObject(),
      enrollmentCount: course.enrolledStudents.length,
      completionCount: course.completedStudents.length,
      completionRate: course.enrolledStudents.length > 0 
        ? ((course.completedStudents.length / course.enrolledStudents.length) * 100).toFixed(2)
        : 0
    }));

    res.status(200).json({
      success: true,
      count: coursesWithStats.length,
      data: coursesWithStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};