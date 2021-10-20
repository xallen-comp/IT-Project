//code adapted from WEBINFO
require('dotenv').config()
const mongoose = require("mongoose");
// Connect to MongoDB - database login is retrieved from environment variables - YOU SHOULD
CONNECTION_STRING =
"mongodb+srv://<username>:<password>@it-project.8k0gl.mongodb.net/test"
MONGO_URL =
CONNECTION_STRING.replace("<username>",process.env.MONGO_USERNAME).replace("<password>",process.env.MONGO_PASSWORD)
mongoose.connect(MONGO_URL || "mongodb://localhost", {
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
 dbName: "IT-Project-Database"
})


const db = mongoose.connection
db.on("error", err => {
 console.error(err);
 process.exit(1)
})

db.once("open", async () => {
	console.log("Mongo connection started on " + db.host + ":" + db.port);
})


require('./client');
require('./event');
require('./contacts');
