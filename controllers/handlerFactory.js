const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'Success',
      data: null,
    });
  });

module.exports = {
  deleteOne,
};
