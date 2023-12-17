

const path = require('path');
const DataUriParser = require('datauri/parser.js');

 const getDataUri = (file) => {
    const parser = new DataUriParser();
    console.log('parsser--',parser);
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer);
 }

 module.exports = getDataUri;
 