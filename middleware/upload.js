const multer = require('multer');
const util = require("util");
const {GridFsStorage} = require("multer-gridfs-storage");
const {v4: uuidv4} = require('uuid');
const DIR = './public/';
CONNECTION_STRING =
"mongodb+srv://<username>:<password>@it-project.8k0gl.mongodb.net/test"
MONGO_URL =
CONNECTION_STRING.replace("<username>",process.env.MONGO_USERNAME).replace("<password>",process.env.MONGO_PASSWORD)
//code adapted from https://www.bezkoder.com/node-js-upload-store-images-mongodb/
const storage = GridFsStorage({
    url: MONGO_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "application/octet-stream", "application/pdf", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
        console.log(file.mimetype);
        if (match.indexOf(file.mimetype) === -1) {
        console.log("check");
        const filename = `${file.originalname}`;
        return filename;
    }

    return {
      bucketName: "photos",
      filename: `${file.originalname}`
    };
  }
});

var uploadFile = multer({
    storage: storage
}).single("file");
var upload = util.promisify(uploadFile);
module.exports = upload;