import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// error handler global function
const errorHandler = (err) => {
  if (err) throw err;
};

// logger global function
const logger = (message) => {
  console.log(`${new Date().toLocaleString()} - ${message}`);
};

// creating folder
// fs.mkdir(path.join(__dirname, "test"), {}, (err) => {
//   errorHandler(err);
//   logger("Folder created ✅");
// });

const fileContent = `Hello My name is Saidkodirov, I'm a software engineer`;

// creating file
// fs.writeFile(path.join(__dirname, "test", "test.txt"), fileContent, (err) => {
//   errorHandler(err);
//   logger("File created ✅");
// });

const newFileContent = `\n\nI love coffee and programming, and learning new things is my passion`;

// append something to the file
// fs.appendFile(
//   path.join(__dirname, "test", "test.txt"),
//   newFileContent,
//   (err) => {
//     errorHandler(err);
//     logger("File updated ✅");
//   }
// );

// read file
// fs.readFile(path.join(__dirname, "test", "test.txt"), "utf-8", (err, data) => {
//   errorHandler(err);
//   logger(data);
// });

// rename file name
fs.rename(
  path.join(__dirname, "test", "test.txt"),
  path.join(__dirname, "test", "test-updated.txt"),
  (err) => {
    errorHandler(err);
    logger("File renamed ✅");
  }
);
