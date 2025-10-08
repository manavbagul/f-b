const express = require("express");
const path = require("path");
const { pdf_build } = require("./pdf-builder-file");
const app = express();

app.use(express.json());
app.use("/pdfs", express.static(path.join("/tmp", "pdf")));

app.get("/", (req, res) => {
  res.send("Server API Working");
});

app.post("/api/application", (req, res) => {
  const fields = req.body;
  pdf_build(fields, (err, fileUrl) => {
    if (err) {
      return res.status(500).json({ error: "Failed to generate PDF" });
    }
    res.json({ downloadUrl: fileUrl });
  });
});

// Export the app for Vercel serverless handler
module.exports = app;
