const path = require('path');
const fs = require("fs");
const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
 
const upload = multer({ dest: "uploads/" })

module.exports = upload;