const express = require("express");
const {
  getAllProducts,
  getProductById,
  //createProduct,
} = require("../controllers/productController");

const router = express.Router();

// Get all products and tickets
router.get("/", getAllProducts);

// Get a specific product/ticket by ID
router.get("/:id", getProductById);

// Create a new product/ticket
//router.post("/", createProduct);

module.exports = router;
