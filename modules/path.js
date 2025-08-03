// file: example.mjs or if "type": "module" in package.json
import path, { basename, dirname, extname } from "path";
import { fileURLToPath } from "url";

// __filename and __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log("__dirname:", __dirname);
// console.log("file:", __filename);
// console.log("file: ", basename(__filename));
// console.log("dir: ", dirname(__dirname));
// console.log("extension: ", extname(__filename));

const obj = path.parse(__filename);
console.log("obj: ", obj);

console.log("join: ", path.join(__dirname, "test", "test.txt"));
