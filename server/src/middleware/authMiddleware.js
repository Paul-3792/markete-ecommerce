const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req, res, next) => {
  // console.log("FULL AUTH HEADER:", req.headers.authorization);

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const token = authHeader.substring(7).trim();

    // console.log("TOKEN LENGTH:", token.length);
    // console.log("TOKEN PARTS:", token.split(".").length);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);
    req.user = await User.findById(decoded.id).select("-password");
    


    if (!req.user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    // console.log("JWT VERIFY ERROR:", error.message);
    // console.log("JWT ERROR NAME:", error.name);

    return res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

const admin = (req, res, next) => {
  // console.log("Checking admin for user:", req.user?.email, "role:", req.user?.role);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };