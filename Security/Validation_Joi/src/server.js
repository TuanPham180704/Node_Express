const express = require("express");
const { validateUser } = require("./userValidator");

const app = express();
app.use(express.json());

app.post("/register", validateUser, (req, res) => {
  res.json({ message: "Đăng ký thành công", data: req.body });
});

app.listen(3000, () => console.log("🚀 Server chạy cổng 3000"));
