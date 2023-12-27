// we will verify the token
const jwt = require("jsonwebtoken");
const { catchAsyncError } = require("./catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const asyncHandler = require("express-async-handler");

const authMiddlewares = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded); // { id: '658c6c001540b8823d3874b1', iat: 1703702379, exp: 1704998379 }
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login Again");
    }
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are Not An Admin");
  } else {
    next();
  }
});

module.exports = { authMiddlewares, isAdmin };
