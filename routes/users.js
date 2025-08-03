import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/add-user", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-users.html"));
});

router.post("/users", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;
