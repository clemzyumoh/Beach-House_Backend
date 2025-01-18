// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     }, // Reference to the user
//     status: { type: String, required: true }, // "success", "failed", etc.
//     reference: { type: String, required: true }, // Paystack transaction reference
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Transaction", transactionSchema);
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Make sure 'User' is the correct model name
  },
  type: { type: String, required: true, enum: ["ticket", "product"] },
  quantity: { type: Number, required: true }, // Number of tickets/products
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" }, // 'pending', 'success', or 'failed'
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
