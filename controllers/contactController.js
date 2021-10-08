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
 const oneContact = await Contact.findById(req.params.contactId);
 if (oneContact === null) { 
     // no Contact found in database
    res.status(404)
    return res.send("Contact not found")
 }
    return res.send(oneContact) // Contact was found
 } 
 catch (err) { // error occurred
    res.status(400)
    console.log(err);
    return res.send("Database query failed")
 }
}

//add Contact to the database
const addContact = (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const comments = req.body.comments;
    const email = req.body.email;
    const occupation = req.body.occupation;
    const phone = req.body.phone;
    const events = req.body.events;
    const mutual_friends = req.body.mutual_friends;
    const photo = req.body.photo;

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
        const oneContact = await Contact.findById(req.params.contactId);
        const first_name = req.body.first_name ? req.body.first_name: oneContact.first_name;
        const last_name = req.body.last_name ? req.body.last_name: oneContact.last_name;
        const comments = req.body.comments ? req.body.comments: oneContact.comments;
        const email = req.body.email ? req.body.email: oneContact.email;
        const occupation = req.body.occupation ? req.body.occupation: oneContact.occupation;
        const phone = req.body.phone ? req.body.phone: oneContact.phone;
        const events = req.body.events ? req.body.events: oneContact.events;
        const mutual_friends = req.body.mutual_friends ? req.body.mutual_friends: oneContact.mutual_friends;
        const photo = req.body.photo ? req.body.photo: oneContact.photo;
        const update = {
            first_name,
            last_name,
            email,
            occupation,
            phone,
            comments,
            events,
            mutual_friends,
            photo,
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