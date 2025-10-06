import express from "express";

const router = express.Router();

router.get("/info", (req, res) => {
  res.json({
    message: "Thông tin người dùng an toàn nhờ Helmet",
  });
});

export default router;
