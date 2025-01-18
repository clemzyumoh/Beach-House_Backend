const Transaction = require("../models/transaction");

// Update a transaction's status
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};
// Create a transaction entry
const createTransaction = async (req, res) => {
  const createdAt = new Date(req.body.created_at);
  const paidAt = new Date(req.body.paid_at);
  const { userId, status, reference } = req.body;
  if (!userId || !status || !reference) {
    return res
      .status(400)
      .json({ error: "All fields (userId, status, reference) are required" });
  }

  try {
    const newTransaction = new Transaction({
      userId,
      status,
      reference,
      createdAt,
      paidAt,
      amount: req.body.amount,
      status: req.body.status,
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json({
      message: "Transaction recorded successfully",
      transaction: savedTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record transaction" });
  }
};

// Get all transaction details
// const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find().populate(
//       "userId",
//       "name email"
//     );
//     console.log("Fetched transactions:", transactions); // Log transactions to identify issues
//     // Check for missing fields
//     const sanitizedTransactions = transactions.filter((transaction) => {
//       if (!transaction.status || !transaction.userId || !transaction.reference) {
//         console.warn("Invalid transaction found:", transaction);
//         return false; // Exclude invalid transactions
//       }
//       return true;
//     });
//      console.log("Fetched sanitized transactions:", sanitizedTransactions);
//     // Populate user details
//     res.status(200).json(transactions);
//   } catch (error) {
//     console.error("Error in getAllTransactions:", error.message);
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve transactions" });
//   }
// };
// const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find().populate(
//       "userId",
//       "name email"
//     );

//     transactions.forEach((transaction) => {
//       if (!transaction.userId) {
//         console.warn("Transaction with missing userId:", transaction);
//       }
//     });

//     // Check for missing fields
//     const sanitizedTransactions = transactions.filter((transaction) => {
//       if (
//         !transaction.status ||
//         !transaction.userId ||
//         !transaction.reference
//       ) {
//         console.warn("Invalid transaction found:", transaction);
//         return false; // Exclude invalid transactions
//       }
//       return true;
//     });

//     console.log("Fetched sanitized transactions:", sanitizedTransactions);

//     res.status(200).json(sanitizedTransactions);
//   } catch (error) {
//     console.error("Error in getAllTransactions:", error.message);
//     res.status(500).json({ error: "Failed to retrieve transactions" });
//   }
// };
// const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find().populate(
//       "userId",
//       "name email"
//     );

//     // Log transactions to verify the fetched data
//     console.log("Fetched transactions:", transactions);

//      transactions.forEach((transaction) => {
//       if (!transaction.status) {
//         console.warn("Transaction with undefined status:", transaction);
//       }})

//     if (!transactions || transactions.length === 0) {
//       return res.status(404).json({ message: "No transactions found" });
//     }

//     // Validate each transaction's status and log if undefined
//     transactions.forEach((transaction) => {
//       if (!transaction.status) {
//         console.warn("Transaction missing status:", transaction);
//       }
//     });

//     res.status(200).json(transactions);
//   } catch (error) {
//     console.error("Error in getAllTransactions:", error.message);
//     res.status(500).json({ error: "Failed to retrieve transactions" });
//   }
// };
// const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find().populate(
//       "userId",
//       "name email"
//     );
//     console.log("Fetched transactions:", transactions);

//     // Validate data
//     const validTransactions = transactions.filter((transaction) => {
//       if (!transaction.status) {
//         console.error("Invalid transaction without status:", transaction);
//         return false;
//       }
//       return true;
//     });

//     res.status(200).json(validTransactions);
//   } catch (error) {
//     console.error("Error in getAllTransactions:", error.message);
//     res.status(500).json({ error: "Failed to retrieve transactions" });
//   }
// };
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate(
      "userId",
      "name email"
    );
    console.log("Fetched transactions:", transactions);

    // Filter out invalid transactions
    const validTransactions = transactions.filter(
      (transaction) =>
        transaction.status !== undefined && transaction.status !== null
    );
    if (validTransactions.length === 0) {
      return res.status(404).json({ message: "No valid transactions found" });
    }

    res.status(200).json(validTransactions);
  } catch (error) {
    console.error("Error in getAllTransactions:", error.message);
    res.status(500).json({ error: "Failed to retrieve transactions" });
  }
};

// Backend: Admin controller
// controllers/transactionController.js
//const Transaction = require("../models/transaction");
const deleteSelectedTransactions = async (req, res) => {
  const { transactionIds } = req.body;

  console.log("Transaction IDs received:", transactionIds); // Log incoming data

  if (
    !transactionIds ||
    !Array.isArray(transactionIds) ||
    transactionIds.length === 0
  ) {
    return res.status(400).json({ message: "No transactions selected." });
  }

  try {
    // Delete multiple transactions
    const result = await Transaction.deleteMany({
      _id: { $in: transactionIds },
    });

    console.log("Deletion result:", result); // Log deletion result
    return res
      .status(200)
      .json({ message: "Selected transactions deleted successfully." });
  } catch (error) {
    console.error("Error deleting transactions:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete selected transactions" });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteSelectedTransactions,
};
