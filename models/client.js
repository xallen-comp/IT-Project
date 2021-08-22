const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
	clientId: String, 
	name: String, 
	comments: String
})

const Client = mongoose.model("Client", clientSchema)

module.exports = Client 