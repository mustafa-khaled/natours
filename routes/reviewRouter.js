const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

// MERGE PARAMS => to allow child routers to access route parameters defined in their parent routers.
// In this case => Access :/tourId from the tours router inside this child router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router.route('/:id').get(getReview).delete(deleteReview).patch(updateReview);

module.exports = router;
