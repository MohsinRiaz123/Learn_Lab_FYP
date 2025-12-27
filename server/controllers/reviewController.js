const Review = require('../models/Review');

exports.getStudentReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find()
      .populate('student', 'name profileImage')
      .populate('course', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalReviews = await Review.countDocuments();
    const totalPages = Math.ceil(totalReviews / limit);

    // Calculate average rating
    const avgRatingResult = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' }
        }
      }
    ]);

    const averageRating = avgRatingResult[0]?.averageRating || 0;

    res.status(200).json({
      success: true,
      count: reviews.length,
      totalReviews,
      totalPages,
      currentPage: page,
      averageRating: parseFloat(averageRating.toFixed(2)),
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};