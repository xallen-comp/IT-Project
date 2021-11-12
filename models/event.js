const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
	//eventId: String, 
	title: {
        type: String,
        required: true,
    },
	event_type: {
        type: String,
    },
	description: {
        type: String,
    },
	start_time: {
        type: String,
		required: true,
	},
	end_time: {
        type: String
	},
	colour: {
        type: String,
		default: 'Red',
    },
	reminder: {
        type: [Number],
		default: 30,
    },
	importance: {
        type: String,
		enum: ['Very Low','Low', 'Medium', 'High','Very High'],		
		default: 'Medium'
    },
	contacts: {
       // type: [Contact.contactSchema]
	   type: [String]
    },
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event 