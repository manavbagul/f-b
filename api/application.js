import { pdf_build } from "../lib/pdf-builder-file";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const fields = req.body;

    const buffer = await pdf_build(fields); // returns Buffer

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=output.pdf");
    res.send(buffer);
  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}
