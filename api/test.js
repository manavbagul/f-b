import { pdf_build } from "../lib/pdf-builder-file";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.status(500).json({ message: "server working " });
}
