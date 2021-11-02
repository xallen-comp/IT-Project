const express = require('express')

// add client router 
const eventRouter = express.Router()
const eventController = require('../controllers/eventController')

//CREATE ----------------------------------------------------------

eventRouter.post('/add', eventController.addEvent);

//READ ----------------------------------------------------------

eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/:eventId', eventController.getOneEvent);
eventRouter.post('/getreminders', eventController.getReminders);

//UPDATE ----------------------------------------------------------

eventRouter.post('/:eventId/update', eventController.updateEvent);

//DELETE ----------------------------------------------------------

eventRouter.post('/:eventId/delete', eventController.deleteEvent)

// export the router
module.exports = eventRouter