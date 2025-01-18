


const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/product");

dotenv.config();
const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data (optional)
    await Product.deleteMany({});
    console.log("Old data removed.");

    // Seed new data
    
     const products = [
       {
         name: "VIP Ticket",
         description: "Access to VIP lounge",
         price: 40000,
         originalPrice: 50000,
         time: "7pm",
         rating: "5.0",
         discount: "20",
         type: "ticket",
         ticketCategory: "VIP",
         eventDate: "2024-12-25",
         location: "Beach-house Center",
         image: `${backendUrl}/images/vip.png`,
         stock: null,
       },
       {
         name: "Regular Ticket",
         description: "Access to main event",
         price: 4000,
         originalPrice: 5000,
         time: "7pm",
         rating: "4.0",
         discount: "20",
         type: "ticket",
         ticketCategory: "Regular",
         eventDate: "2024-12-25",
         location: "Beach-house Center",
         image: `${backendUrl}/images/regular.png`,

         stock: null,
       },
       {
         name: "Gold Ticket",
         description: "Access to main event,free drinks",
         price: 12000,
         originalPrice: 15000,
         type: "ticket",
         time: "7pm",
         ticketCategory: "Gold",
         eventDate: "2024-12-25",
         location: "Beach-house Center",
         image: `${backendUrl}/images/gold.png`,
         rating: "4.0",
         discount: "20",
         stock: null,
       },
       {
         name: "Diamond Ticket",
         description: "Access to main event,free drinks",
         price: 16000,
         originalPrice: 20000,
         time: "7pm",
         rating: "4.5",
         discount: "20",
         type: "ticket",
         ticketCategory: "Diamond",
         eventDate: "2024-12-25",
         location: "Beach-house Center",
         image: `${backendUrl}/images/diamond.png`,
         stock: null,
       },
       {
         name: "Platinum Ticket",
         description: "Access to main event,free drinks",
         price: 24000,
         originalPrice: 30000,
         time: "7pm",
         rating: "5.0",
         discount: "20",
         type: "ticket",
         ticketCategory: "Platinum",
         eventDate: "2024-12-25",
         location: "Beach-house Center",
         image: `${backendUrl}/images/platinum.png`,
         stock: null,
       },
       {
         name: "Black T-Shirt",
         description: "Long sleeves with logo",
         price: 3000,
         type: "product",
         stock: 40,
         image: `${backendUrl}/images/polo2.jpg`,
         variations: [
           { color: "black", size: "M", stock: 15 },
           { color: "black", size: "L", stock: 25 },
         ],
       },
       {
         name: "black T-Shirt",
         description: "Short sleeves with logo",
         price: 3000,
         type: "product",
         stock: 40,
         image: `${backendUrl}/images/polo1.jpg`,
         variations: [
           { color: "black", size: "M", stock: 15 },
           { color: "black", size: "L", stock: 25 },
         ],
       },
       {
         name: "White T-Shirt",
         description: "Stylish white t-shirt with logo",
         price: 3000,
         type: "product",
         stock: 40,
         image: `${backendUrl}/images/polo3.jpg`,
         variations: [
           { color: "white", size: "M", stock: 15 },
           { color: "white", size: "L", stock: 25 },
         ],
       },
       {
         name: "Black Cap",
         description: "Stylish black Cap with logo",
         price: 2000,
         type: "product",
         stock: 40,
         image: `${backendUrl}/images/black-cap.jpg`,

         variations: [
           { color: "black", size: "M", stock: 15 },
           { color: "black", size: "L", stock: 25 },
         ],
       },
       {
         name: "White Cap",
         description: "Stylish white cap with logo",
         price: 2000,
         type: "product",
         stock: 40,
         image: `${backendUrl}/images/white-cap.jpg`,
         variations: [
           { color: "white", size: "M", stock: 15 },
           { color: "white", size: "L", stock: 25 },
         ],
       },
     ];

    await Product.insertMany(products);
    console.log("Data Seeded");

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedProducts();
