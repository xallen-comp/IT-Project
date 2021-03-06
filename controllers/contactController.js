const mongoose = require("mongoose");
// import Contact model
const Contact = mongoose.model("Contact");
const upload = require('../middleware/upload.js');
//adapted send image from https://www.freecodecamp.org/news/gridfs-making-file-uploading-to-mongodb/

//gridfs connection 
CONNECTION_STRING =
"mongodb+srv://<username>:<password>@it-project.8k0gl.mongodb.net/test"
MONGO_URL =
CONNECTION_STRING.replace("<username>",process.env.MONGO_USERNAME).replace("<password>",process.env.MONGO_PASSWORD)
const url = MONGO_URL;
const connect = mongoose.createConnection(url, {useNewUrlParser: true, useUnifiedTopology: true});
var gfs;
connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {bucketName: "photos"});
});
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


//get image from database
const getImage = async(req, res) => {
    try{
    gfs.find({filename: req.body.filename}).toArray((err, files) => {
        if(!files[0] || files.length === 0){
            return res.send('Not in database');
        }
        else{
            console.log(files[0]._id);
            gfs.openDownloadStreamByName(files[0].filename).pipe(res);
        }
    });
    }
    catch(error){
        console.log(error);
        return res.send(`Error when trying to fetch image: ${error}`);
    }
}

//delete image from database
const deleteFile = async(req, res) => {
    try{
    gfs.find({filename: req.body.filename}).toArray((err, files) => {
        if(!files[0] || files.length === 0){
            return res.send('Not in database');
        }
        else{
            gfs.delete(files[0]._id);
            return res.send("Deleted");
        }
    });
    }
    catch(error){
        console.log(error);
        return res.send(`Error when trying to fetch file: ${error}`);
    }
}

const uploadFile = async(req, res) =>{
    try{
        await upload(req, res);
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        return res.send(req.file);
    } 
  catch (error) {
    console.log(error);
    return res.send(`Error when trying upload file: ${error}`);
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
    const file = req.body.file;
    const contact_type = req.body.contact_type;
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
        file,
        contact_type
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
        const file =  req.body.file ? req.body.file: oneContact.file;
        const contact_type =  req.body.contact_type ? req.body.contact_type : oneContact.contact_type;
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
            file,
            contact_type
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


const deleteContact = async (req, res) => {
    console.log(req.params.contactId)
    try {
       const oneContact = await Contact.findByIdAndRemove(req.params.contactId);
       return res.send("Deleted Contact") // Contact was found and deleted 
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
 updateContact,
 uploadFile,
 deleteContact,
 getImage,
 deleteFile
}