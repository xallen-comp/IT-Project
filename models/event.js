const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
	eventId: String, 
	type: String, 
	description: String,
	start: Date,
	end: Date
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event 