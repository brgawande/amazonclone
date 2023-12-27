const express = require("express");
const {
  createUser,
  loginUser,
  getallUsers,
  getsingleUser,
  deleteUser,
  updateUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/allusers", getallUsers);
router.get("/singleuser/:id", getsingleUser);
router.delete("/deleteuser/:id", deleteUser);
router.put("/updateuser/:id", updateUser);

module.exports = router;
