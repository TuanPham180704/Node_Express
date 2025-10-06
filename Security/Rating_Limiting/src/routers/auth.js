import express from "express";
import { loginLimited } from "../middleware/rate_limit";

const router = express.Router();

router.post("/login", loginLimited, (req, res) => {
  const { username, password } = req.body;
  if (username === "tuan" && password === "123456") {
    return res.json({ message: "Đăng nhập thành công!" });
  }
  return res.status(401).json({ error: "Sai thông tin đăng nhập." });
});

router.get("/public", (req, res) => {
  res.json({ message: "API công khai, nhưng vẫn bị giới hạn chung." });
});

export default router;
