

const path = require('path');
const DataUriParser = require('datauri/parser.js');

 const getDataUri = (file) => {
    const parser = new DataUriParser();
    console.log('parsser--',parser);
    const extName = path.extname(file.originalname).toString();
    console.log('video parse--');
    return parser.format(extName,file.buffer);
 }

 module.exports = getDataUri;
 