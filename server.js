import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Create table if not exists
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ MySQL Connected & Table Ready");
}

initDB().catch((err) => {
  console.error("❌ DB Init Error:", err);
  process.exit(1);
});

// GET all todos
app.get("/todos", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM todos ORDER BY created_at DESC");
  res.json(rows);
});

// CREATE todo
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const [result] = await pool.query(
    "INSERT INTO todos (title) VALUES (?)",
    [title]
  );

  res.status(201).json({ id: result.insertId, title, completed: false });
});

// TOGGLE todo
app.put("/todos/:id/toggle", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "UPDATE todos SET completed = NOT completed WHERE id = ?",
    [id]
  );

  const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

  res.json(rows[0]);
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM todos WHERE id = ?", [id]);

  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
