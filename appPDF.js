const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function editPDF(pdfPath, outputPdfPath, textToAdd) {
    try {
        // Read the existing PDF
        const existingPdfBytes = await fs.promises.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Add a new page
        const page = pdfDoc.addPage([595, 842]); // A4 page size

        // Get the font
        // const fontData = await fs.promises.readFile(`path/to/${font}.afm`);
        // const customFont = await pdfDoc.embedFont(fontData);

        // // Set font for the added text
        // page.setFont(customFont);

        // Add text to the page
        page.drawText(textToAdd, {
            x: 50,
            y: 700,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // Save the modified PDF
        const modifiedPdfBytes = await pdfDoc.save();

        // Write the modified PDF to a new file
        await fs.promises.writeFile(outputPdfPath, modifiedPdfBytes);

        console.log('PDF edited successfully!');
    } catch (error) {
        console.error('Error editing PDF:', error);
    }
}

// Example usage
const pdfPath = './certificate.pdf'; // Path to the existing PDF file
const outputPdfPath = './editedCertificate.pdf'; // Output path for the edited PDF
const textToAdd = 'Sagar Deware'; // Text to add to the PDF

editPDF(pdfPath, outputPdfPath, textToAdd);
