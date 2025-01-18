const express = require("express");
const {
  initializePayment,
  verifyPayment,
} = require("../controllers/paystackController");

const router = express.Router();

// Route to initialize payment
router.post("/initialize", initializePayment);

// Route to verify payment after transaction
router.get("/verify/:reference", verifyPayment);

module.exports = router;
