import express from "express";
import { z } from "zod";
import { validate } from "../middleware/validate_zod.js";

const router = express.Router();
const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/register", validate(userSchema), (req, res) => {
  res.json({
    message: "Đăng ký thành công",
    data: req.validate,
  });
});

export default router;
