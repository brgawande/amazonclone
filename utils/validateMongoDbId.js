const mongoose = require("mongoose");
const ErrorHandler = require("./ErrorHandler");

// this is use to check the id in the database that it is valid or not
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid)
    return next(new ErrorHandler("This Id is Not Valid or Not Found", 404));
};

module.exports = validateMongoDbId;
