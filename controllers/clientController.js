const mongoose = require("mongoose")
// import client model
const Client = mongoose.model("Client")
// get all clients
const getAllClients = async (req, res) => {
 try {
 const clients = await Client.find()
 return res.send(clients)
 } catch (err) {
 res.status(400)
 return res.send("Database query failed")
 }
}
// find one client by their id
const getOneClient = async (req, res) => {
 try {
 const oneClient = await Client.findOne( {"clientId": req.params.id})
 if (oneClient === null) { // no client found in database
 res.status(404)
 return res.send("Client not found")
 }
 return res.send(oneClient) // client was found
 } catch (err) { // error occurred
 res.status(400)
 return res.send("Database query failed")
 }
}
//add client to the database
const addClient = (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const comments = req.body.comments

    const newClient = new Client({
        name,
        comments,
    });

    newClient.save()
        .then(() => res.json('Client added!'))
        .catch (err => res.status(400).json(`Error: ${err}`));
}
// remember to export the functions
module.exports = {
 getAllClients,
 getOneClient,
 addClient
}