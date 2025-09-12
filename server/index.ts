import express from "express";
import { PORT } from "./config.ts";

const app = express();

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from backend 👋" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
