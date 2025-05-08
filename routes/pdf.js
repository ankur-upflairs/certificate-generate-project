const express = require('express');
const router = express.Router();
const PDFController = require('../controllers/pdfController');

router.post('/convert-to-pdf', async (req, res) => {
    try {
        const result = await PDFController.convertImagesToPDF();
        res.json(result);
    } catch (error) {
        console.error('Error in PDF conversion:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Error converting images to PDF'
        });
    }
});

module.exports = router;