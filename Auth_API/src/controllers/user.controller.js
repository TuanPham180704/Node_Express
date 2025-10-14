const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User create" }, user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found" }, user);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(404).json({ message: "Invalid password" });
    const token = await jwt.sign(
      {
        id: user.id,
        username: user.username,
        password: user.password,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ messgae: "login success" }, token);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
