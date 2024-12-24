const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = { asyncHandler, validateObjectId };
