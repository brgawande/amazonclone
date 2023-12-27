const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");

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

module.exports = { createUser };
