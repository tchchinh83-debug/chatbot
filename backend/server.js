import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  res.json({
    reply: "Server received: " + message
  });
});

// serve frontend
app.use(express.static("../frontend/dist"));

// fallback cho SPA
app.use((req, res) => {
  res.sendFile(path.resolve("../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});