const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

class PDFController {
    static async convertImagesToPDF() {
        try {
            // Create pdf directory if it doesn't exist
            const pdfDir = path.join(__dirname, '..', 'pdf');
            if (fs.existsSync(pdfDir)) {
                // Clear existing PDF directory
                fs.readdirSync(pdfDir).forEach(file => {
                    const filePath = path.join(pdfDir, file);
                    fs.unlinkSync(filePath);
                });
            } else {
                fs.mkdirSync(pdfDir);
            }

            // Read all images from images1 folder
            const imagesDir = path.join(__dirname, '..', 'images1');
            const images = fs.readdirSync(imagesDir).filter(file => 
                file.toLowerCase().endsWith('.png') || 
                file.toLowerCase().endsWith('.jpg') || 
                file.toLowerCase().endsWith('.jpeg')
            );

            if (images.length === 0) {
                throw new Error('No images found in the images1 directory');
            }

            // Create individual PDFs for each image
            for (const image of images) {
                const imagePath = path.join(imagesDir, image);
                const pdfName = path.parse(image).name + '.pdf';
                const outputPath = path.join(pdfDir, pdfName);
                
                // Create a new PDF document for each image
                const doc = new PDFDocument({ autoFirstPage: false });
                doc.pipe(fs.createWriteStream(outputPath));
                
                // Add the image to the PDF
                const img = doc.openImage(imagePath);
                doc.addPage({ size: [img.width, img.height] });
                doc.image(img, 0, 0, { width: img.width, height: img.height });
                
                doc.end();
            }

            return { success: true, message: 'PDF created successfully' };
        } catch (error) {
            console.error('Error in convertImagesToPDF:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = PDFController;