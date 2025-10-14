const jwt = require("jsonwebtoken");

// Generate a JWT token for a user (pass the full user object)
const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };
  console.log("Generating token with payload:", payload);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Verify the JWT token and return decoded payload
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
