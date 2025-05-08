const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const FileController = require('../controllers/fileController');
const UploadController = require('../controllers/uploadController.js');
const { printAllCertificates } = require('../controllers/certificate.js')
const deleteImages = require('../utils/deleteImages');
const path = require('path');
// Route to display upload form
router.get('/', (req, res) => {
    res.render('upload');
});

// Handle file uploads
router.post('/', upload.fields([
    { name: 'template', maxCount: 1 },
    { name: 'studentData', maxCount: 1 }
]), async (req, res) => {
    // console.log(req.files)
    try {
        const action = req.body.action;
        const result = await UploadController.processFiles(req.files['template'][0], req.files['studentData'][0], action);
        // console.log(result)
        // res.json(result);
        await deleteImages(path.join(__dirname, '..', 'images1'))
        printAllCertificates(req, res)
    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error processing upload'
        });
    }
});

module.exports = router;