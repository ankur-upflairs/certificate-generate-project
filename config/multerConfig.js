const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, filename);
        
        // Store file information in uploads.json
        const uploadInfo = {
            timestamp: Date.now(),
            files: {}
        };
        
        try {
            // Read existing data if file exists
            if (fs.existsSync('uploads/uploads.json')) {
                const data = fs.readFileSync('uploads/uploads.json');
                uploadInfo.files = JSON.parse(data);
            }
            
            // Add new file information
            uploadInfo.files[file.fieldname] = {
                originalName: file.originalname,
                filename: filename,
                path: path.join('uploads', filename)
            };
            
            // Write updated data back to file
            fs.writeFileSync('uploads/uploads.json', JSON.stringify(uploadInfo, null, 2));
        } catch (error) {
            console.error('Error saving file information:', error);
        }
    }
});

const upload = multer({ storage: storage });

module.exports = upload;