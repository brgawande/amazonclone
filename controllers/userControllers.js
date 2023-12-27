const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

const createUser = catchAsyncError(async (req, res, next) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //   create new user
    const newUser = await User.create(req.body);
    res.status(200).json({
      success: true,
      newUser,
    });
  } else {
    res.json({
      meg: "User Already Exist",
      success: false,
    });
  }
});

const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (!findUser)
    return next(new ErrorHandler("Incorrect Email Or Password", 404));

  const isMatch = await findUser.comparePassword(password);
  if (!isMatch)
    return next(new ErrorHandler("Incorrect email or password", 404));

  res.status(200).json({
    success: true,
    message: `Welcome back ${findUser.firstname}`,
    _id: findUser?._id,
    firstname: findUser?.firstname,
    lastname: findUser?.lastname,
    email: findUser?.email,
    mobile: findUser?.mobile,
    token: findUser?._id,
  });
});

// update user
const updateUser = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    updateUser,
  });
});

// get all users
const getallUsers = catchAsyncError(async (req, res, next) => {
  const getUsers = await User.find();
  res.status(200).json({
    success: true,
    getUsers,
  });
});

// get a single user
const getsingleUser = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("User Not Found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

// delete a user
const deleteUser = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const deletedUser = await User.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    msg: "User Deleted Successfully",
    deletedUser,
  });
});

module.exports = {
  createUser,
  loginUser,
  getallUsers,
  getsingleUser,
  deleteUser,
  updateUser,
};
