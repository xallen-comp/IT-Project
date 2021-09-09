const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
	contactId: String, 
	name: String, 
	comments: String
})

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact