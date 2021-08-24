const express = require('express')

// add client router 
const eventRouter = express.Router()
const eventController = require('../controllers/eventController')

eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/:eventId', eventController.getOneEvent);

eventRouter.post('/add', eventController.addEvent);
eventRouter.post('/:eventId/update', eventController.updateEvent);

// export the router
module.exports = eventRouter