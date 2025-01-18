const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");
const {getDashboardSummary} = require("../controllers/adminController")
const { verifyAdmin } = require("../middleware/authMiddleware");


const { getAllUsers } = require("../controllers/userController");
const { getAllTransactions } = require("../controllers/transactionController");

const { registerAdmin, loginAdmin } = require("../controllers/adminController");

// Register route (One-time use)
router.post("/register", registerAdmin);

// Login route
router.post("/login", loginAdmin);

// Admin dashboard summary
// router.get("/dashboard-summary", async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     const transactions = await getAllTransactions();

//     res.status(200).json({
//       totalUsers: users.length,
//       totalTransactions: transactions.length,
//       transactions,
//     });
//   } catch (error) {
//     console.error("Error fetching dashboard summary:", error.message); // Log the error
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch dashboard summary" });
//   }
// });
// router.get("/dashboard-summary", async (req, res) => {
//   try {
//     // Fetch users and transactions concurrently
//     const [users, transactions] = await Promise.all([
//       getAllUsers(),
//       getAllTransactions(),
//     ]);

//     // Handle unexpected results
//     if (!Array.isArray(users) || !Array.isArray(transactions)) {
//       console.error(
//         "Unexpected result from getAllUsers or getAllTransactions."
//       );
//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to fetch dashboard summary due to unexpected data format.",
//         });
//     }

//     // Respond with the summary
//     res.status(200).json({
//       totalUsers: users.length,
//       totalTransactions: transactions.length,
//       transactions,
//     });
//   } catch (error) {
//     // Log detailed error information
//     console.error("Error fetching dashboard summary:", error.message);
//     console.error(error.stack); // Log stack trace for debugging

//     // Respond with a user-friendly error message
//     res
//       .status(500)
//       .json({
//         error: "Failed to fetch dashboard summary. Please try again later.",
//       });
//   }
// });
router.get("/dashboard-summary",getDashboardSummary, async (req, res) => {
  try {
    const users = await getAllUsers();
    const transactions = await Transaction.find().populate(
      "userId",
      "name email"
    );
    res.status(200).json({
      totalUsers: users.length,
      totalTransactions: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error.message);
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
});


module.exports = router;
