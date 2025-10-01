const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { createClient } = require("redis");

const app = express();
const upload = multer({ dest: "src/uploads/" });

const client = createClient({
  url: "redis://localhost:6379",
});

client
  .connect()
  .then(() => console.log("✅Kết nối thành công tới Redis"))
  .catch((err) => console.error("❌ Lỗi Redis:", err));

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const destPath = path.join(__dirname, "storage", req.file.originalname);

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(destPath);

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    fs.unlinkSync(filePath);
    res.json({ message: "✅Upload thành công", file: req.file.originalname });
  });
  writeStream.on("error", (err) => {
    res.status(500).json({ error: err.message });
  });
});

app.get("/data", async (req, res) => {
  const cacheKey = "my_api_data"; // key trong Redis

  const cached = await client.get(cacheKey);
  if (cached) {
    return res.json({ siurce: "cache", data: JSON.parse(cached) });
  }
  const fakeData = {
    users: [
      { id: 1, name: "Tuan Dev" },
      { id: 2, name: "Nguyen Van A" },
    ],
    timestamp: new Date(),
  };
  await client.setEx(cacheKey, 10, JSON.stringify(fakeData));

  res.json({ source: "server", data: fakeData });
});

app.listen(3000, () => console.log("🚀 Server chạy tại http://localhost:3000"));
