const Tour = require('../models/tourModel');
const { catchAsync } = require('../utils/catchAsync');

const getOverview = catchAsync(async (req, res, next) => {
  // 1): Get tour data from collection
  const tours = await Tour.find();

  // 2): Build template

  // 3): Render that template using tour data from 1
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

const getTour = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  // 1): Get data for the requested tour
  const tour = await Tour.findOne({ slug: slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  // 2): Build template

  // 3): Render that template using tour data from 1
  res.status(200).render('tour', {
    title: 'The Forest Hike',
    tour,
  });
});

module.exports = {
  getOverview,
  getTour,
};
