const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    message: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1): Check if email & password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2): Check if user exist & password is correct
  const user = await User.findOne({ email: email }).select('+password');
  //      - check if user exist first
  //      - check correct password second
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }
  // 3): if everything os ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

module.exports = {
  signup,
  login,
};
