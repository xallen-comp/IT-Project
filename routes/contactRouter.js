const express = require('express')

// add Contact router 
const contactRouter = express.Router()
const contactController = require('../controllers/contactController')

//CREATE ----------------------------------------------------------

contactRouter.post('/add', contactController.addContact);

//READ ------------------------------------------------------------

contactRouter.get('/', contactController.getAllContacts);
contactRouter.get('/:contactId', contactController.getOneContact);

//UPDATE ----------------------------------------------------------

contactRouter.post('/:contactId/update', contactController.updateContact)


//DELETE ----------------------------------------------------------





// export the router
module.exports = contactRouter