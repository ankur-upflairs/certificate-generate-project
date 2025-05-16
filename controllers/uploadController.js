const xlsx = require("xlsx");
// const csv = require('csv-parse');
const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const deleteImages = require("../utils/deleteImages");
const nodeHtmlToImage = require("node-html-to-image");
const { html } = require("./html.js");
const { formatData } = require("../utils/formatData.js");
class UploadController {
  // Process the uploaded files
  static async processFiles(templateFile, dataFile, action,textCase) {
    try {
      // Validate files
      if (!templateFile || !dataFile) {
        throw new Error("Both template and data files are required");
      }

      // Process student data file
      const studentData = await UploadController.parseStudentData(dataFile,textCase);
      let imagePath = templateFile.path;
      const oldPath = path.join(__dirname, "..", imagePath);
      const newPath = path.join(__dirname, "masterclass.png");

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error("Error moving file:", err);
        } else {
          console.log("File moved successfully");
        }
      });
      if (action === "preview") {
        return {
          success: true,
          data: studentData.slice(0, 5), // Preview first 5 records
          message: "Preview data retrieved successfully",
        };
      } else if (action === "generate") {
        // TODO: Implement certificate generation logic

        return {
          success: true,
          message: "Certificates generated successfully",
        };
      }
    } catch (error) {
      console.error("Error in processFiles:", error);
      throw error;
    }
  }

  // Parse student data from Excel or CSV
  static async parseStudentData(file,textCase='capitalize') {
    try {
      const ext = path.extname(file.originalname).toLowerCase();
      let data;

      if (ext === ".xlsx" || ext === ".xls") {
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      } else if (ext === ".csv") {
        data = await new Promise((resolve, reject) => {
          const results = [];
          fs.createReadStream(file.path)
            .pipe(
              parse({
                columns: true,
                skip_empty_lines: true,
              })
            )
            .on("data", (row) => results.push(row))
            .on("end", () => resolve(results))
            .on("error", (error) => reject(error));
        });
      } else {
        throw new Error("Unsupported file format");
      }
      let formattedData= formatData(data,textCase)
      // console.log(formattedData)
      // Save the formatted data to data.json
      fs.writeFileSync(
        path.join(__dirname, "data.json"),
        JSON.stringify(formattedData, null, 2)
      );

      return formattedData;
    } catch (error) {
      console.error("Error parsing student data:", error);
      throw error;
    }
  }
}

module.exports = UploadController;
