const express = require("express");
const app = express();
app.use(express.json());

let users = [];

app.get("/", (req, res) => {
  res.send("Hello Testing !");
});
// CRUD API
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).send("User not found");
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter((u) => u.id !== id);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app; // để test Supertest
