const mongoose = require("mongoose")
// import client model
const Event = mongoose.model("Event")

// get all clients
const getAllEvents = async (req, res) => {
 try {
 const events = await Event.find()
 return res.send(events)
 } catch (err) {
 res.status(400)
 return res.send("Database query failed")
 }
}

// find one client by their id
const getOneEvent = async (req, res) => {
 try {
 const oneEvent = await Event.findOne( {"eventId": req.params.id})
 if (oneEvent === null) { // no client found in database
 res.status(404)
 return res.send("Event not found")
 }
 return res.send(oneEvent) // client was found
 } catch (err) { // error occurred
 res.status(400)
 return res.send("Database query failed")
 }
}

//add client to the database
const addEvent = (req, res) => {
    console.log(req.body)
    const type = req.body.type
    const description = req.body.description 
    const start = Date.now()
    const end = Date.now()

    const newEvent = new Event({
        type,
        description,
        start,
        end 
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch (err => res.status(400).json(`Error: ${err}`));
}

//update event information 
const updateEvent= async (req, res) => {
     try {
    const oneEvent = await Event.findOne( {"eventId": req.params.id})
    const update = {
        type: req.body.type,
        description: req.body.description,
        start: Date.now(),
        end: Date.now()
    }
    await oneEvent.updateOne(update)
    return res.send("Updated event") // event was found and updated 
    } 
    catch (err) { // error occurred
        console.log(err)
        res.status(400)
        return res.send("Database query failed")
    }
}

// exporting the functions
module.exports = {
 getAllEvents,
 getOneEvent,
 addEvent,
 updateEvent
}