const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

router.get(
  "/dashboard",
  authenticateToken,
  
  authorizeRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin!" });
  }
);

module.exports = router;
