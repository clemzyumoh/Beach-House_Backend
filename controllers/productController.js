const Product = require("../models/product");

// Get all products and tickets
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all items
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get a specific product/ticket by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

// Create a new product/ticket
// const createProduct = async (req, res) => {
//   const {
//     name,
//     description,
//     price,
//     type,
//     ticketCategory,
//     eventDate,
//     location,
//     stock,
//     variations,
//   } = req.body;

//   try {
//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       type,
//       ticketCategory,
//       eventDate,
//       location,
//       stock,
//       variations,
//     });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create item" });
//   }
// };

module.exports = { getAllProducts, getProductById} //createProduct };
