const express = require('express')

// add Comment router 
const commentRouter = express.Router()
const commentController = require('../controllers/commentController')

//CREATE ----------------------------------------------------------

commentRouter.post('/add', commentController.addComment);

//READ ------------------------------------------------------------

commentRouter.get('/', commentController.getAllComments);

commentRouter.get('/:contact_Id', commentController.getAllComments);

commentRouter.get('/:contactId', commentController.getOneComment);

//UPDATE ----------------------------------------------------------

commentRouter.post('/:contactId/update', commentController.updateComment)


//DELETE ----------------------------------------------------------

commentRouter.post('/:contactId/delete', commentController.deleteComment)





// export the router
module.exports = commentRouter