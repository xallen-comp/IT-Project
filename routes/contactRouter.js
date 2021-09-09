const express = require('express')

// add Contact router 
const contactRouter = express.Router()
const contactController = require('../controllers/contactController')

clientRouter.get('/', contactController.getAllContacts);
clientRouter.get('/:contactId', contactController.getOneContact);

clientRouter.post('/add', contactController.addContact);
clientRouter.post('/:contactId/update', contactController.updateContact)

// export the router
module.exports = contactRouter