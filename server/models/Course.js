const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  image: {
    type: String,
    default: 'default-course.jpg'
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: [true, 'Instructor is required']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  completedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);