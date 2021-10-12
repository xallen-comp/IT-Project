//Entry point for backend
//Code adapted from WEBINFO 
//Styling suggestions: 
//end line with ; 
//make comments about chunks of code 
//indent
//const cors = require('cors')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
var mongoose = require('mongoose');
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

//require('./models');

// middleware

app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');

require('dotenv').config()


CONNECTION_STRING =
"mongodb+srv://<username>:<password>@it-project.8k0gl.mongodb.net/test"
MONGO_URL =
CONNECTION_STRING.replace("<username>",process.env.MONGO_USERNAME).replace("<password>",process.env.MONGO_PASSWORD)

const conn = mongoose.createConnection(MONGO_URL);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

//storage obj
const storage = new GridFsStorage({
	url: MONGO_URL,
	file: (req, file) => {
	  return new Promise((resolve, reject) => {
		crypto.randomBytes(16, (err, buf) => {
		  if (err) {
			return reject(err);
		  }
		  const filename = buf.toString('hex') + path.extname(file.originalname);
		  const fileInfo = {
			filename: filename,
			bucketName: 'uploads'
		  };
		  resolve(fileInfo);
		});
	  });
	}
  });
  const upload = multer({ storage });

//get

app.get('/', (req, res) =>{
	res.render('index');
})

//post
app.post('/upload', upload.single('file'), (req,res) => {
	res.json({ file: req.file });
});

app.listen(process.env.PORT || 4000, ()=> {
	console.log('The website app is listening on port 4000!');
})








const eventRouter = require('./routes/eventRouter');

// handler for clients
// handler for events
app.use('/events', eventRouter);


/*
app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

app.post('/', upload.single('image'), (req, res, next) => {
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});








/*
var connection = mongooseDrv.connection;
if (connection !== "undefined") {
    console.log(connection.readyState.toString());

	var path = require("path");

	var grid = require("gridfs-stream");

	var fs = require("fs");

	var filesrc = path.join(__dirname, "./photo/SpongeBob_stock_art.png");

	Grid.mongo = mongooseDrv.mongo;
    //9.Open the connection and write file
    connection.once("open", () => {
        console.log("Connection Open");
        var gridfs = grid(connection.db);
        if (gridfs) {
            //9a. create a stream, this will be
            //used to store file in database
            var streamwrite = gridfs.createWriteStream({
                //the file will be stored with the name
                filename: "SpongeBob_stock_art.png"
            });
            //9b. create a readstream to read the file
            //from the filestored folder
            //and pipe into the database
            fs.createReadStream(filesrc).pipe(streamwrite);
            //9c. Complete the write operation
            streamwrite.on("close", function (file) {
                console.log("Write written successfully in database");
            });
        } else {
            console.log("Sorry No Grid FS Object");
        }
    });
} else {
 
    console.log('Sorry not connected');
}
console.log("done");




//multer is for image handling
var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

var imgModel = require('./models/image'); */