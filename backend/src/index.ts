import "dotenv/config";
import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const port = Number(process.env.PORT) || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1
});

app.use(cors());
app.use(express.json());

// Cek server hidup
app.get("/", (_req, res) => {
    res.json({
        message: "Backend berjalan"
    });
});

// Ambil semua produk dari database
app.get("/api/posts", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, description, created_at FROM post"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Gagal mengambil data kursus:", error);
    res.status(500).json({
        message: "gagal mengambil data kursus"
    });
  }
});

app.post("/api/posts", async(_req, res) => {
    try {
        const { title, description } = _req.body;

        if(!title || typeof title !== "string") {
            res.status(400).json({
                message: "title wajib diisi"
            });
        }

        const result = await pool.query(
            "INSERT INTO post (title, description) VALUES($1, $2) RETURNING id, title, description", [title, description ?? null]
        )

        res.status(201).json({
            message: "berhasil menambahkan kursus",
            data: result.rows[0]
        });
    } catch(error) {
        console.error('Gagal menambah post: ', error);
        res.status(500).json({ message: "gagal menambah data posts" });
    }
})

app.get('/api/posts/:id', async(_req, res) => {
    try {
        const id: number = Number(_req.params.id);

        if(!id || typeof id !== 'number' || id < 1) {
            res.status(400).json({
                message: "id tidak valid."
            })
        }

        const result = await pool.query(
            "SELECT title, description, created_at FROM post WHERE id = $1",
            [id]
        )
        
        res.json({
            message: "berhasil melihat detail posts",
            data: result.rows[0]
        })
    } catch(error) {
        console.error("Gagal melihat detail posts");
        res.status(500).json({
            message: "gagal melihat detail posts"
        })

    }
})

if(!process.env.VERCEL) {
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
}

export default app;