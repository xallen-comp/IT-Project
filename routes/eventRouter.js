const express = require('express')

// add client router 
const eventRouter = express.Router()
const eventController = require('../controllers/eventController')

eventRouter.get('/events', eventController.getAllEvents);
eventRouter.get('/events/:eventId', eventController.getOneEvent);

eventRouter.post('/events/add', eventController.addEvent);

// export the router
module.exports = eventRouter