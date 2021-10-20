const express = require('express')

// add Comment router 
const commentRouter = express.Router()
const commentController = require('../controllers/commentController')

//CREATE ----------------------------------------------------------

commentRouter.post('/add', commentController.addComment);

//READ ------------------------------------------------------------

commentRouter.get('/', commentController.getAllComments);

commentRouter.get('/:contactId', commentController.getContactsComments);

commentRouter.get('/oneComment/:contactID', commentController.getOneComment);

//UPDATE ----------------------------------------------------------

commentRouter.post('/:commentId/update', commentController.updateComment)


//DELETE ----------------------------------------------------------

commentRouter.delete('/:commentId/delete', commentController.deleteComment)





// export the router
module.exports = commentRouter