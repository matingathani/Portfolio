const fs = require("fs");
const path = require("path");

const workerSource = path.join(__dirname, "..", "node_modules", "pdfjs-dist", "build", "pdf.worker.min.js");
const publicDir = path.join(__dirname, "..", "public");
const workerTarget = path.join(publicDir, "pdf.worker.min.js");

try {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  if (fs.existsSync(workerSource)) {
    fs.copyFileSync(workerSource, workerTarget);
    console.log("pdf.worker.min.js copied to public/");
  } else {
    console.warn("pdf.worker.min.js not found in node_modules. Skipping copy.");
  }
} catch (err) {
  console.warn("Failed to copy pdf.worker.min.js", err);
}
