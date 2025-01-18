const User = require("../models/User");
// Update a user's details
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, ticketType, quantity, totalAmount } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, ticketType, quantity, totalAmount },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};
// Create a user entry after payment initialization
const createUser = async (req, res) => {
  const { name, email, ticketType, quantity, totalAmount, transactionId } =
    req.body;

  try {
    const newUser = new User({
      name,
      email,
      ticketType,
      quantity,
      totalAmount,
      transactionId,
    });
    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Get all user details
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users fetched:", users); // Log users to verify
    return users;
    //res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error.message); // Log the error
    throw error; // Re-throw the error to be handled upstream
    //console.error(error);
    // res.status(500).json({ error: "Failed to retrieve users" });
  }
};

module.exports = { createUser, getAllUsers, updateUser };
