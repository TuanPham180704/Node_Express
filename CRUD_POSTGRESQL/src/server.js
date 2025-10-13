// index.js
const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./config/db");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello PostgreSQL Backend!");
});
app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age)
    return res.status(404).json({ msg: "Missing Filed!" });
  try {
    const user = await pool.query(
      "INSERT INTO users (name,email,age) VALUES($1,$2,$3) RETURNING *",
      [name, email, age]
    );
    res.status(201).json(user.rows[0]);
  } catch (error) {
    return res.status(404).json({ err: error.message });
  }
});
app.get("/users", async (req, res) => {
  const { name, email, age } = req.query;
  let query = "SELECT * FROM users";
  const params = [];
  if (name) {
    params.push(name);
    query += `WHERE name=$${params.length}`;
  }
  if (email) {
    params.push(email);
    query += `WHERE email=$${params.length}`;
  }
  if (age) {
    params.push(age);
    query +=
      params.length > 1
        ? `AND age=$${params.length}`
        : `WHERE age=$${params.length}`;
  }
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {}
});
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  let query = "DELETE FROM users WHERE id=$1 RETURNING *";
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json({ delete: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(404).json({ msg: "Invalid id" });
  const query = "SELECT * FROM users WHERE id=$1";
  try {
    const result = await pool.query(query, [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *",
      [name, email, age, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
