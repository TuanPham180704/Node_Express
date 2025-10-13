const express = require("express");
const app = express();
const port = 3000;
const localhost = "localhost";
const users = require("./data/user");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Node Js ");
});
app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  const id = parseFloat(req.params.id);
  const user = users.find((u) => u.id == id);
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.json(user);
});
app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({ msg: "Add User Success" });
});
app.put("/users/:id", (req, res) => {
  const id = parseFloat(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index !== 1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    return res.status(404).json({ msg: "User not found" });
  }
});
app.delete("/users/:id", (req, res) => {
  const id = parseFloat(req.params.id);
  if (!id) return res.status(404).json({ msg: "User not found" });
  users.splice(id, 1);
  res.json({ msg: "Delete success" });
});

app.listen(port, () => {
  console.log(`Sever is running on Port http://${localhost}:${port}`);
});





Pc05gg0744890