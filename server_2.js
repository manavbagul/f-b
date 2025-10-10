const express = require("express");

const path = require("path");
const { pdf_build } = require("./lib/pdf-builder-file");
const { log } = require("console");
const app = express();

app.use(express.json());
app.use("/pdfs", express.static(path.join(__dirname, "pdf")));

app.get("/", (req, res) => {
  res.send("Server API Working");
});
app.post("/api/application", async (req, res) => {
  const fields = req.body;

  const buffer = await pdf_build(fields);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=output.pdf");
  res.send(buffer);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
