const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path")

dotenv.config();

const adminRoutes = require("./routes/adminRoutes"); // Correct path to routes
const paymentRoutes = require("./routes/paymentRoutes"); // Correct path to payment routes (if needed)
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const productRoutes = require("./routes/productRoutes");
console.log(adminRoutes);
console.log(paymentRoutes);
const app = express();

app.use(
  cors({
    origin: ["https://beach-house-ticket.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
//app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
// Routes
app.use("/api/products", productRoutes);

// Serve static files from the "assets/images" directory
app.use("/images", express.static(path.join(__dirname, "Assets/images")));
app.get("/" ,(req ,res) =>{res.json("Hello")})


// app._router.stack.forEach((r) => {
//   if (r.route && r.route.path) {
//     console.log(r.route.path);
//   }
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


