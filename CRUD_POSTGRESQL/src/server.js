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

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
