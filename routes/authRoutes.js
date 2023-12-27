const express = require("express");
const {
  createUser,
  loginUser,
  getallUsers,
  getsingleUser,
  deleteUser,
  updateUser,
  getmyprofile,
  blockUser,
  UnblockUser,
} = require("../controllers/userControllers");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/allusers", getallUsers);
router.get("/singleuser/:id", authMiddlewares, isAdmin, getsingleUser);
router.delete("/deleteuser/:id", deleteUser);
router.put("/updateuser", authMiddlewares, updateUser);
router.get("/getmyprofile", authMiddlewares, getmyprofile);
router.put("/blockuser/:id", authMiddlewares, isAdmin, blockUser);
router.put("/unblockuser/:id", authMiddlewares, isAdmin, UnblockUser);

module.exports = router;
