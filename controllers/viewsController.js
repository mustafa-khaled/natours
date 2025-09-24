const Tour = require('../models/tourModel');
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2): Build template

  // 3): Render that template using tour data from 1
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour,
  });
});

const getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
});

const getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
});

module.exports = {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
};
