const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
	contact_id: {
        type: String,
		required: true,
	},
	comment_body: {
        type: String,
		required: true,
	}
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment