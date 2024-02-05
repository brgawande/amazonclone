const jwt = require("jsonwebtoken");

// its same like jwt token..ye isliye banaya hai jab user wps se login kare to uska token extend ho jaye
const generatRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

module.exports = { generatRefreshToken };
