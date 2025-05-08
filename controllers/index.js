const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');
const {html} = require('./html.js')

const image = fs.readFileSync(__dirname + '/masterclass.png');
const base64Image = new Buffer.from(image).toString('base64');
const dataURI = 'data:image/jpeg;base64,' + base64Image
let data = fs.readFileSync(__dirname + '/masterclass_data.json');
    let json = JSON.parse(data);
    // console.log(json);
    json.forEach(element => {
        element.imageSource=dataURI
        // element.output=`./images/${element.Name}.png`
    })
    json.forEach(element => {
        nodeHtmlToImage({
        output: `./images/${element.Name}.png`,
        html: html,
        content: element
      })
    })