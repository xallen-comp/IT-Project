const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
	//contactId: String,
	first_name: {
        type: String,
		required: true,
	},
	last_name: {
        type: String,
		required: true,
	}, 
	email: {
        type: String, 
	},
	occupation: {
        type: String, 
	},
	phone: {
        type: Number, 
	},
	comments: {
        type: [String],
	},
	events: {
        //type: [Event.eventSchema],
		type: [String],
	},
	mutual_friends: {
        type: [String],
	},
	photo: {
        type: String
	},
	file: {
        type: String
    }
})

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact