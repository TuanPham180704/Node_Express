const express = require("express");
const { register, login } = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", auth, (req, res) => {
  res.json({ message: "Welcome to protected route!", user: req.user });
});

module.exports = router;
