import "dotenv/config";
import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const port = Number(process.env.PORT) || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Cek server hidup
app.get("/", (_req, res) => {
  res.json({ status: "ok", pesan: "Backend berjalan" });
});

// Ambil semua produk dari database
app.get("/api/posts", async (_req, res) => {
  try {
    const hasil = await pool.query(
      "SELECT id, title, description FROM post  "
    );
    res.json(hasil.rows);
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    res.status(500).json({ pesan: "Gagal mengambil data produk" });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});