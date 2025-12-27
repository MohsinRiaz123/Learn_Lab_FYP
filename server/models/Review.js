const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student is required']
  },
  message: {
    type: String,
    required: [true, 'Review message is required'],
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);