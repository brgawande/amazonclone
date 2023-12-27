const express = require("express");
const {
  createUser,
  loginUser,
  getallUsers,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/allusers", getallUsers);

module.exports = router;
