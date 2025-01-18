const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");
const User = require("../models/User");

const router = express.Router();

router.post("/", createUser); // Add user after payment initialization
router.get("/", getAllUsers); // Get all users
router.put("/:id", updateUser); // Update user details by ID

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

module.exports = router;
