const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const courseController = require('../controllers/courseController');
const reviewController = require('../controllers/reviewController');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Test route
router.get('/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Protected routes
router.use(protect);

// Stats route (instructor only)
router.get('/stats', authorize('instructor'), statsController.getStats);

// Course routes
router.get('/TopCourses', courseController.getTopCourses);

// Review routes
router.get('/studentReviews', reviewController.getStudentReviews);

// Contact route
router.post('/contact', contactController.submitContact);

module.exports = router;