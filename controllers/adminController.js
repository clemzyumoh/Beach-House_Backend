const Admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js")
const Transaction = require("../models/transaction.js")



// Register Admin (One-time use for setup)
const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register admin" });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

// In controllers/adminController.js
const getDashboardSummary = async (req, res) => {
  try {
    const users = await User.find();
    const transactions = await Transaction.find().populate("userId", "name email");

    res.status(200).json({
      totalUsers: users.length,
      totalTransactions: transactions.length,
      transactions,
    });
  } 
  catch (error) {
    console.error("Error fetching dashboard summary:", error.message);
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
};


module.exports = { registerAdmin, loginAdmin , getDashboardSummary};
