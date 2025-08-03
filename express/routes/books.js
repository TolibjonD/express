import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "books", "index.html"));
});

router.get("/api", (req, res) => {
  const books = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/books.json"), "utf8")
  );
  res.json(books);
});

router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "books", "add.html"));
});

router.get("/edit/:id", (req, res) => {
  const books = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/books.json"), "utf8")
  );
  const book = books.find((book) => book.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).send("Book not found");
  }

  res.sendFile(path.join(__dirname, "..", "views", "books", "edit.html"));
});

router.put("/:id", (req, res) => {
  try {
    const books = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../db/books.json"), "utf8")
    );
    const book = books.find((book) => book.id === parseInt(req.params.id));

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!req.body.title || !req.body.author) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    book.title = req.body.title;
    book.author = req.body.author;

    fs.writeFileSync(
      path.join(__dirname, "../db/books.json"),
      JSON.stringify(books, null, 2)
    );

    res.json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const books = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../db/books.json"), "utf8")
    );

    const bookIndex = books.findIndex(
      (book) => book.id === parseInt(req.params.id)
    );

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books[bookIndex];
    books.splice(bookIndex, 1);

    fs.writeFileSync(
      path.join(__dirname, "../db/books.json"),
      JSON.stringify(books, null, 2)
    );

    res.json({
      message: "Book deleted successfully",
      deletedBook: deletedBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
});

router.get("/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  const books = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/books.json"), "utf8")
  );
  const book = books.find((book) => book.id === ID);
  if (book) {
    res.json(book);
    return;
  }
  res.status(404).json({ message: "Book not found" });
  return;
});

router.post("/add", (req, res) => {
  const books = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/books.json"), "utf8")
  );
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  const isExist = books.find((book) => book.title === newBook.title);
  if (isExist) {
    res.status(400).json({ message: "Book already exists" });
    return;
  }
  if (!newBook.title || !newBook.author) {
    res.status(400).json({ message: "Title and author are required" });
    return;
  }
  books.push(newBook);
  fs.writeFileSync(
    path.join(__dirname, "../db/books.json"),
    JSON.stringify(books, null, 2)
  );
  res.redirect("/books");
});

export default router;
