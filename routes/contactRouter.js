const express = require('express');

// add Contact router 
const contactRouter = express.Router()
const contactController = require('../controllers/contactController')


//CREATE ----------------------------------------------------------

contactRouter.post('/add', contactController.addContact);
contactRouter.post('/upload', contactController.uploadImage);

//READ ------------------------------------------------------------

contactRouter.get('/', contactController.getAllContacts);
contactRouter.get('/:contactId', contactController.getOneContact);

//UPDATE ----------------------------------------------------------

contactRouter.post('/:contactId/update', contactController.updateContact)


//DELETE ----------------------------------------------------------

contactRouter.post('/:contactId/delete', contactController.deleteContact)

// export the router
module.exports = contactRouter