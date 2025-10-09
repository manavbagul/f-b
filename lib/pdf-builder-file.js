const PDFDocument = require("pdfkit");
require("pdfkit-table");
const { createPdfHelper } = require("./arj-pdf-function");
const path = require("path");
const getStream = require("get-stream"); // for converting stream to buffer
const pdf_config = require("./pdf_config.json");

const cmToPoints = (cm) => cm * 28.3465;

const pdf_build = async (fields) => {
  const doc = new PDFDocument(pdf_config);

  // Load fonts
  const getFontPath = (filename) => {
    return path.join(process.cwd(), "fonts", filename); // Ensure Vercel includes them in build
  };

  const fontPath1 = getFontPath("BalBharatiDev01.TTF");
  const fontPath2 = getFontPath("BalBharatiDev02.TTF");
  console.log(fontPath1);
  doc.registerFont("regular", fontPath1);
  doc.registerFont("bold", fontPath2);

  const p = createPdfHelper(doc, cmToPoints);

  fields.forEach((field) => {
    if (field.text !== "") {
      switch (field.name) {
        case "Heading":
          p.Heading(field);
          break;
        case "Application Number":
          p.ApplicationNumber(field);
          break;
        case "Paragraph":
          p.Paragraph(field);
          break;
        case "To":
          p.To(field);
          break;
        case "Applicant Name":
          p.ApplicantName(field);
          break;
        case "Subject":
          p.Subject(field);
          break;
        case "Responder Name":
          p.RespondantName(field);
          break;
        case "Bond Spacing":
          p.BondSpacing(field);
          break;
        case "Date N Place":
          p.PlaceNDate(field);
          break;
        case "Signature":
          p.Signature(field);
          break;
        default:
          console.log("Unknown field:", field);
          break;
      }
    }
  });

  doc.end();

  // Return the PDF as a Buffer
  return await getStream.buffer(doc);
};

module.exports = { pdf_build };
