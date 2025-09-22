const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  try {
    const { username, password, email, full_name } = req.params;
    const result = await pool.query(
      "INSERT INTO auth.users (username,password,email,full_name) VALUES ($1,$2,$3,4$) RETURNING *",
      [username, password, email, full_name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM auth.user ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM auth.user WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { username, password, email, full_name } = req.params;
    const result = await pool.query(
      "UPDATE auth.users SET username=$1, password=$2, email=$3, full_name=$4, updated_at=NOW() WHERE id=$5 RETURNING *",
      [username, password, email, full_name, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM auth.users WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
