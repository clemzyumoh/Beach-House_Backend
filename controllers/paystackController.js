const axios = require("axios");
const nodemailer = require("nodemailer");

// Helper Function to Send Email
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your preferred email service
    auth: {
      user: "johnclerk253@gmail.com", // Your email
      pass: "2536368Johnclerk", // Your password
    },
  });

  const mailOptions = {
    from: "johnclerk253@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Initialize Payment (Create a Payment Request)
// const initializePayment = async (req, res) => {
//   const { amount, email } = req.body;

//   try {
//     // Set up the payload for the Paystack API
//     const data = {
//       email: email,
//       amount: amount * 100, // Paystack expects the amount in kobo (100 kobo = 1 Naira)
//     };

//     // Send a POST request to Paystack's payment initialization endpoint
//     const response = await axios.post(
//       "https://api.paystack.co/transaction/initialize",
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Send the payment link to the frontend
//     res
//       .status(200)
//       .json({ message: "Payment initialized", data: response.data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to initialize payment" });
//   }
// };

const Transaction = require("../models/transaction"); // Import your Transaction model

const initializePayment = async (req, res) => {
  const { amount, email, name, type, quantity} = req.body;

   if (!["ticket", "product"].includes(type)) {
     return res.status(400).json({ error: "Invalid transaction type" });
   }
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be greater than 0" });
    }
  try {
    const reference = `txn_${Date.now()}`; // Generate a unique reference

    // Set up the payload for the Paystack API
    const data = {
      email,
      amount: amount * 100, // Convert Naira to kobo
      reference,
    };

    // Send a POST request to Paystack
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Optionally, save the initial transaction in MongoDB with 'pending' status
    const transaction = new Transaction({
      reference,
      name,
      email,
      type,
      amount,
      quantity,
      status: "pending",
    });
    await transaction.save();

    // Send the payment link to the frontend
    res.status(200).json({
      message: "Payment initialized",
      paymentUrl: response.data.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("Error initializing payment:", error.message);
    res.status(500).json({ error: "Failed to initialize payment" });
  }
};

// Verify Payment (After payment is made, verify the transaction)
// const verifyPayment = async (req, res) => {
//   const { reference } = req.params;

//   try {
//     // Send a GET request to Paystack's verify endpoint to check the payment status
//     const response = await axios.get(
//       `https://api.paystack.co/transaction/verify/${reference}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         },
//       }
//     );

//     // If payment is successful, store transaction in database
//     if (response.data.data.status === "success") {
//       // Here you can save transaction details to the database
//       res
//         .status(200)
//         .json({ message: "Payment successful", data: response.data });
//     } else {
//       res.status(400).json({ message: "Payment failed", data: response.data });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to verify payment" });
//   }
// };
// const verifyPayment = async (req, res) => {
//   const { reference } = req.body;

//   try {
//     // Send a GET request to Paystack's verify endpoint
//     const response = await axios.get(
//       `https://api.paystack.co/transaction/verify/${reference}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         },
//       }
//     );

//     const paymentStatus = response.data.data.status;

//     if (paymentStatus === "success") {
//       // Update transaction status in MongoDB
//       await Transaction.findOneAndUpdate(
//         { reference },
//         { status: "success" },
//         { new: true }
//       );

//       res.status(200).json({
//         message: "Payment successful",
//         data: response.data.data,
//       });
//     } else {
//       res.status(400).json({
//         message: "Payment failed or incomplete",
//         data: response.data.data,
//       });
//     }
//   } catch (error) {
//     console.error("Error verifying payment:", error.message);
//     res.status(500).json({ error: "Failed to verify payment" });
//   }
// Verify Payment (After payment is made, verify the transaction)
const verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    // Send a GET request to Paystack's verify endpoint
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentStatus = response.data.data.status;

    if (paymentStatus === "success") {
      // Update transaction status in MongoDB
      const updatedTransaction = await Transaction.findOneAndUpdate(
        { reference },
        { status: "success" },
        { new: true }
      );

      // Send confirmation email to the user
      await sendEmail(
        updatedTransaction.email,
        "Payment Successful",
        `Dear ${updatedTransaction.name},\n\nYour payment of ₦${updatedTransaction.amount} was successful. Thank you for your purchase!\n\nTransaction Reference: ${updatedTransaction.reference}`
      );

      res.status(200).json({
        message: "Payment successful and email sent",
        data: response.data.data,
      });
    } else {
      // Handle failed or incomplete payment
      await Transaction.findOneAndUpdate(
        { reference },
        { status: "failed" },
        { new: true }
      );

      res.status(400).json({
        message: "Payment failed or incomplete",
        data: response.data.data,
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    res.status(500).json({ error: "Failed to verify payment" });
  }
};

module.exports = { initializePayment, verifyPayment };
