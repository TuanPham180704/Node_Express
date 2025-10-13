// index.js
const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./config/db");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello NodeJs ProgreSQL !!!");
});

app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age)
    return res.status(404).json({ msg: "Missing Filed" });
  try {
    const result = await pool.query(
      "INSERT INTO users (name,email,age) VALUES ($1,$2,$3) RETURNING *",
      [name, email, age]
    );
    res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.get("/users", async (req, res) => {
  const { name, email, age } = req.query;
  const query = "SELECT * FROM users";
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
      params.length >= 1
        ? `AND age=$${params.length}`
        : `WHERE age=$${params.length}`;
  }
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const query = "SELECT * FROM users WHERE id=$1";
  if (isNaN(id)) return res.status(404).json({ msg: "Invalid id" });
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const query = "DELETE  FROM users WHERE id=$1 RETURNING * ";
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json({ delete: result.rows });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  const query =
    "UPDATE users SET name=$1,age=$2,email=$3 WHERE id=$4 RETURNING *";
  try {
    const result = await pool.query(query, [name, age, email, id]);
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
