const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number , default:0},
  time: { type: String , default: ""},
  rating: { type: String , default: "0"},
  discount: { type: String, default: "0%" },
  type: { type: String, required: true, enum: ["ticket", "product"] }, // ticket or product
  ticketCategory: {
    type: String,
    enum: ["VIP", "Regular", "Gold", "Platinum", "Diamond"],
  }, // For tickets
  eventDate: { type: Date }, // Optional for tickets
  location: { type: String }, // Optional for tickets
  stock: { type: Number, default: 0 }, // For products
  image: { type: String },
  variations: [
    {
      color: { type: String },
      size: { type: String },
      stock: { type: Number },
    },
  ], // Optional for product variations
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
