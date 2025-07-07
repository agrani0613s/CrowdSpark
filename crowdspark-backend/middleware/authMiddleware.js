// // middleware/authMiddleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     next();
//   } catch (err) {
//     console.error("Auth error:", err.message);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export const protect = async (req, res, next) => {
//   let token;

//   // Check for Authorization header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Find user by ID and exclude password
//       req.user = await User.findById(decoded.id).select("-password");

//       if (!req.user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       next(); // User is authenticated, proceed
//     } catch (err) {
//       console.error("Auth error:", err);
//       return res.status(401).json({
//         message:
//           err.name === "TokenExpiredError"
//             ? "Token expired, please log in again"
//             : "Not authorized, token invalid",
//       });
//     }
//   } else {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    // Check for Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      if (!token || token === "null" || token === "undefined") {
        console.error("No valid token received");
        return res
          .status(401)
          .json({ message: "No valid token, authorization denied" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded JWT payload:", decoded);

      // Find user and attach to req
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        console.error("User not found for decoded ID:", decoded.id);
        return res.status(401).json({ message: "User not found" });
      }

      next(); // Pass control to next middleware/route
    } else {
      console.error("Authorization header missing or malformed");
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
  } catch (err) {
    console.error("Auth error:", err.name, "-", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token, please log in again" });
    }
    return res.status(500).json({ message: "Server error during authentication" });
  }
};

