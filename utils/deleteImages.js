const fs = require('fs');
const path = require('path');

module.exports = async function deleteAllFiles(folder) {
  try {
    // Check if folder exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      console.log(`Created directory: ${folder}`);
      return;
    }

    // Delete all files and subdirectories recursively
    deleteContents(folder);
    console.log('All files and folders deleted');
  } catch (err) {
    console.error('Error deleting files:', err);
  }
}

function deleteContents(directory) {
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      // Recursively delete contents of subdirectory
      deleteContents(itemPath);
      // Then delete the empty directory
      fs.rmdirSync(itemPath);
    } else {
      // Delete file
      fs.unlinkSync(itemPath);
    }
  }
}