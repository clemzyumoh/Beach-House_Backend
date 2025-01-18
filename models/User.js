const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    ticketType: { type: String, required: true }, // e.g., "Regular", "VIP"
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true }, // Total payment made
    transactionId: { type: String, required: true }, // Reference to payment transaction
    isAdmin: { type: Boolean, default: false }, // Ensure this field exists
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("User", userSchema);
