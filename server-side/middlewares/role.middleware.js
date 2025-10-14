// // Middleware to restrict access to specific role
// // Usage: authorizeRole("student") or authorizeRole("admin")
// const authorizeRole = (role) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     if (req.user.role !== role) {
//       return res
//         .status(403)
//         .json({ message: "Access denied: only " + role + " allowed" });
//     }

//     next();
//   };
// };

// module.exports = { authorizeRole };
// Middleware to restrict access to specific roles
// Usage: authorizeRole("student") or authorizeRole("admin", "recruiter")
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Access denied: only [${roles.join(", ")}] allowed` });
    }

    next();
  };
};

module.exports = { authorizeRole };
