const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path to your User model

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Access denied" }); // Not an admin
    }

    req.user = user; // Pass the user to the next middleware
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in verifyAdmin middleware:", error.message);
    return res.status(403).json({ error: "Forbidden" });
  }
  console.log("Token:", token); // Log the token
  console.log("Decoded Token:", decoded); // Log the decoded token
  console.log("User:", user); // Log the user details
};

module.exports = verifyAdmin;
