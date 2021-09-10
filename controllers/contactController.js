const mongoose = require("mongoose")
// import Contact model
const Contact = mongoose.model("Contact")

// get all Contacts
const getAllContacts = async (req, res) => {
 try {
 const contacts = await Contact.find()
 return res.send(contacts)
 } catch (err) {
 res.status(400)
 return res.send("Database query failed")
 }
}
// find one Contact by their id
const getOneContact = async (req, res) => {
 try {
 const oneContact = await Contact.findOne( {"contactId": req.params.id})
 if (oneContact === null) { 
     // no Contact found in database
    res.status(404)
    return res.send("Contact not found")
 }
    return res.send(oneContact) // Contact was found
 } 
 catch (err) { // error occurred
    res.status(400)
    return res.send("Database query failed")
 }
}

//add Contact to the database
const addContact = (req, res) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const comments = req.body.comments
    const email = req.body.email
    const occupation = req.body.occupation
    const phone = req.body.phone
    const events = req.body.events
    const mutual_friends = req.body.mutual_friends
    const photo = req.body.photo

    const newContact = new Contact ({
        first_name,
        last_name,
        email,
        occupation,
        phone,
        comments,
        events,
        mutual_friends,
        photo,
    });

    newContact.save()
        .then(() => res.json('Contact added!'))
        .catch (err => res.status(400).json(`Error: ${err}`));
}

//update Contact information 
const updateContact = async (req, res) => {
     try {
    const oneContact = await Contact.findOne( {"contactId": req.params.id})
    const update = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        occupation: req.body.occupation,
        phone: req.body.phone,
        comments: req.body.comments,
        events: req.body.events,
        mutual_friends: req.body.mutual_friends,
        photo: req.body.photo
    }
    await oneContact.updateOne(update)
    return res.send("Updated Contact") // Contact was found and updated 
    } 
    catch (err) { // error occurred
        console.log(err)
        res.status(400)
        return res.send("Database query failed")
    }
}

// exporting the functions
module.exports = {
 getAllContacts,
 getOneContact,
 addContact,
 updateContact
}