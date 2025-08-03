import express from "express";
import messageRoutes from "./routes/messages.js";
import mainRoutes from "./routes/main.js";
import booksRoutes from "./routes/books.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.use("/messages", messageRoutes);
app.use(mainRoutes);
app.use("/books", booksRoutes);
app.use((req, res, next) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "/views/404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running PORT on ${PORT}`);
});
