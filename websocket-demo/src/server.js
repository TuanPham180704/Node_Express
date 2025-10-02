const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8080 });

const users = new Map();

wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  // Khi client gửi message
  ws.on("message", (msg) => {
    const data = JSON.parse(msg.toString());

    if (data.type === "join") {
      // Lưu username
      users.set(ws, data.username);
      broadcast(`${data.username} đã tham gia phòng chat 🚀`);
    }

    if (data.type === "chat") {
      const username = users.get(ws) || "Ẩn danh";
      broadcast(`${username}: ${data.message}`);
    }
  });

  ws.on("close", () => {
    const username = users.get(ws);
    if (username) {
      broadcast(`❌ ${username} đã rời phòng`);
      users.delete(ws);
    }
  });
});

// Hàm gửi tin nhắn cho tất cả client
function broadcast(msg) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(msg);
    }
  });
}

console.log("🚀 Server chạy tại ws://localhost:8080");
