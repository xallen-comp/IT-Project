const express = require('express')

// add client router 
const clientRouter = express.Router()
const clientController = require('../controllers/clientController')

clientRouter.get('/', clientController.getAllClients);
clientRouter.get('/:clientId', clientController.getOneClient);

clientRouter.post('/add', clientController.addClient);
clientRouter.post('/:clientId/update', clientController.updateClient)

// export the router
module.exports = clientRouter