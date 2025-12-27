const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Instructor name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  bio: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,
    default: 'default-instructor.jpg'
  },
  specialization: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Instructor', instructorSchema);