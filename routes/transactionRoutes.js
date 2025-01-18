const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteSelectedTransactions,
} = require("../controllers/transactionController");
const transaction = require("../models/transaction");

const router = express.Router();

router.post("/", createTransaction); // Add transaction after payment confirmation
router.get("/", getAllTransactions); // Get all transactions
router.put("/:id", updateTransaction); // Update transaction status by ID

// Route to delete selected transactions
router.delete("/delete-selected-transactions", deleteSelectedTransactions);

// router.get("/", async (req, res) => {
//   try {
//     const transactions = await getAllTransactions();
//     res.status(200).json({ transactions });
//   } catch (error) {
//     console.error("Error fetching dashboard summary:", error.message);
//     res.status(500).json({ error: "Failed to fetch dashboard summary" });
//   }
// });

module.exports = router;
