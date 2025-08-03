import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/send", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/contact.html"));
});

router.post("/list", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;
