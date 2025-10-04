const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("🔗 Client connected.");

  const timer = setInterval(() => {
    const now = new Date().toLocaleTimeString();
    res.write(`data: ${now}\n\n`);
  }, 2000);

  req.on("close", () => {
    console.log("❌ Client disconnected.");
    clearInterval(timer);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
});
