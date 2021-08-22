const express = require('express')

// add client router 
const clientRouter = express.Router()
const clientController = require('../controllers/clientController')

clientRouter.get('/clients', clientController.getAllClients);
clientRouter.get('/clients/:clientId', clientController.getOneClient);

clientRouter.post('/clients/add', clientController.addClient);

// export the router
module.exports = clientRouter