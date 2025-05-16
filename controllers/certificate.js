const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs");
const { html } = require("./html.js");
const { CLIENT_RENEG_LIMIT } = require("tls");
const path =require('path')
let limit;
(async () => {
  const pLimit = (await import("p-limit")).default;
  limit = pLimit(1);
})();

const image = fs.readFileSync(__dirname + "/masterclass.png");
const base64Image = new Buffer.from(image).toString("base64");
const dataURI = "data:image/jpeg;base64," + base64Image;

// nodeHtmlToImage({
//   output: './image.png',
//   html: '<html><body><img src="{{{imageSource}}}" /></body></html>',
//   content: { imageSource: dataURI }
// })

exports.home = function (req, res) {
  res.render("certificate");
};
exports.printAllCertificates = function (req, res) {
  // Send response immediately without waiting
  res.render("printCertificate", { name: "hello" });

  // Use setTimeout for background processing
  setTimeout(() => {
    try {
      const image = fs.readFileSync(__dirname + "/masterclass.png");
      const base64Image = Buffer.from(image).toString("base64");
      const dataURI = "data:image/jpeg;base64," + base64Image;
      let data = fs.readFileSync(__dirname + "/data.json");
      let json = JSON.parse(data);

      // Process certificates one by one to avoid memory issues
      console.log("Certificate generation started in background");

      // Process images without Promise chaining
      processImagesSequentially(json, dataURI);
    } catch (error) {
      console.log("Error in background processing setup:", error);
    }
  }, 100);
};

// Helper function to process images one by one
function processImagesSequentially(items, dataURI) {
  (() => {
    try {
      console.log("Starting certificate generation");
      items.forEach((element) => {
        element.imageSource = dataURI;
        element.output = `./images1/${element.Name}.png`;
      });
      limit(() =>
        nodeHtmlToImage({
          html: html,
          content: items,
        })
      );
      // for (let i = 0; i < items.length; i++) {
      //   const element = items[i];
      //   element.imageSource = dataURI;
      //   element.output = `./images1/${element.Name}.png`;

      //   // Process one certificate at a time
      //   await nodeHtmlToImage({
      //     output: element.output,
      //     html: html,
      //     content: element
      //   });

      //   console.log(`Generated certificate for ${element.Name} (${i+1}/${items.length})`);
      // }
      console.log("All certificates generated successfully");
    } catch (error) {
      console.error("Error generating certificates:", error);
    }
  })();
}
exports.previewCertificate = async function (req, res) {
  try {
    const image = fs.readFileSync(__dirname + "/masterclass.png");
    const base64Image = Buffer.from(image).toString("base64");
    const dataURI = "data:image/jpeg;base64," + base64Image;
    let data = fs.readFileSync(__dirname + "/data.json");
    let json = JSON.parse(data);
    const outputPath = path.join(__dirname,'..', "public/preview/image.png");
    console.log('image started')
    await nodeHtmlToImage({
      output: outputPath,
      html: html,
      content: {
        imageSource: dataURI,
        Name: json[0].Name,
        enrollmentNo: json[0].enrollmentNo,
      },
    });
    console.log('image end')
    res.render("preview");
  } catch (error) {
    console.log(error);
  }
};
exports.printCertificate = function (req, res) {
  // const name = req.query.name;
  let data = fs.readFileSync(__dirname + "/masterclass_data.json");
  let json = JSON.parse(data);
  // console.log(json);
  json.forEach((element) => {
    element.imageSource = dataURI;
    element.output = `./images1/${element.Name}.png`;
  });
  nodeHtmlToImage({
    html: html,
    content: json,
  });

  res.render("printCertificate", { name: "hello" });
};
