const mongoose = require("mongoose")
// import client model
const Event = mongoose.model("Event")

// get all clients
const getAllEvents = async (req, res) => {
 try {
 const events = await Event.find();
 return res.send(events)
 } catch (err) {
 res.status(400)
 return res.send("Database query failed")
 }
}

//delete specific reminder
const deleteReminder = async (req, res) => {
    try {
    const oneEvent = await Event.findById(req.params.eventId);
    if (oneEvent === null) { // no client found in database
    res.status(404)
    return res.send("Event not found")
 }
    const index = oneEvent.reminder.indexOf(req.body.reminder);
    if(index > -1){
        oneEvent.reminder.splice(index, 1);
    }
    await oneEvent.updateOne(oneEvent);
    return res.send(oneEvent) // client was found
 } 
 catch (err) { // error occurred
    res.status(400)
    return res.send("Database query failed")
 }
}

// get events that need a reminder to be sent 
const getReminders = async (req, res) => {
 try {
    const events = await Event.find();
    let reminders = [];
    for(index in events){
        for(index2 in events[index].reminder){
            console.log(events[index].time);
            if((events[index].time - Date.now()) - 11*60*60000 <= events[index].reminder[index2]*60000){
                
                let obj = {"title": events[index].title, "_id": events[index]._id, "reminder": events[index].reminder[index2]};
                console.log(obj);
                reminders.push(obj);
            }
            
        }
    }
    return res.send(reminders);
 } catch (err) {
 res.status(400)
 return res.send("Database query failed")
 }
}

// find one event by their id
const getOneEvent = async (req, res) => {
 try {
 const oneEvent = await Event.findById(req.params.eventId);
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
    const title = req.body.title;
    const type = req.body.type;
    const description = req.body.description; 
    const start_time = req.body.start_time;
    const end_time = req.body.end_time; 
    const colour = req.body.colour;
    const reminder = req.body.reminder;
    const importance = req.body.importance;
    const contacts = req.body.contacts;
    const time = req.body.time;
    

    const newEvent = new Event({
        title,
        type,
        description,
        start_time,
        end_time,
        colour,
        reminder,
        importance,
        contacts,
        time
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch (err => res.status(400).json(`Error: ${err}`));
}

//update event information 
const updateEvent= async (req, res) => {
     try {
    const oneEvent = await Event.findById(req.params.eventId);
    const title = req.body.title ? req.body.title: oneEvent.title;
    const type = req.body.type ? req.body.type: oneEvent.type;
    const description = req.body.description ? req.body.description: oneEvent.description; 
    const start_time = req.body.start_time ? req.body.start_time: oneEvent.start_time;
    const end_time = req.body.end_time ? req.body.end_time: oneEvent.end_time; 
    const colour = req.body.colour ? req.body.colour: oneEvent.colour;
    const reminder = req.body.reminder ? req.body.reminder: oneEvent.reminder;
    const importance = req.body.importance ? req.body.importance: oneEvent.importance;
    const contacts = req.body.contacts ? req.body.contacts: oneEvent.contacts;
    const time = req.body.time ? req.body.time: oneEvent.time;
    const update = {
        title,
        type,
        description,
        start_time,
        end_time,
        colour,
        reminder,
        importance,
        contacts,
        time
    }
    await oneEvent.updateOne(update);
    return res.send("Updated event"); // event was found and updated 
    } 
    catch (err) { // error occurred
        console.log(err);
        res.status(400);
        return res.send("Database query failed");
    }
}

//delete event
const deleteEvent = async (req, res) => {
    try {
       const oneEvent = await Event.findByIdAndDelete(req.params.eventId);
   return res.send("Deleted Event") // Event was found and deleted 
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
 updateEvent,
 deleteEvent,
 getReminders,
 deleteReminder
}