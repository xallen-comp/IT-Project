const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
	eventId: String, 
	type: String, 
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event 