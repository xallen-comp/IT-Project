const mongoose = require("mongoose")
// import Comment model
const Comment = mongoose.model("Comment")



//add Comment to the database

const addComment = (req, res) => {
    const contact_id = req.body.contact_id;
    const comment_body = req.body.comment_body;

    const newComment = new Comment ({
        contact_id,
        comment_body,
    });

    newComment.save()
        .then(() => res.json('Comment added!'))
        .catch (err => res.status(400).json(`Error: ${err}`));
}



// get all Comments for contact_id

const getContactsComments = async (req, res) => {
    try {
        const comments = await Comments.filter( {"contact_id": req.params.contactId } )
        console.log("Getting all comments");
        return res.send(comments)
    } catch (err) {
        res.status(404)
        console.log(req.params.contactId);
        return res.send("Database query failed")
    }
}


// get all Comments 

const getAllComments = async (req, res) => {
 try {
 const comments = await Comment.find()
 return res.send(comments)
 } catch (err) {
 res.status(400)
 return res.send("Database query failed")
 }
}


// find one Comment by their comment_id

const getOneComment = async (req, res) => {
 try {
 const oneComment = await Comment.findById(req.params.commentId);
 if (oneComment === null) { 
     // no Comment found in database
    res.status(404)
    return res.send("Comment not found")
 }
    return res.send(oneComment) // Comment was found
 } 
 catch (err) { // error occurred
    res.status(400)
    console.log(err);
    return res.send("Database query failed")
 }
}


//delete Comment 
const deleteComment = async (req, res) => {
    try {
       const oneComment = await Comment.findById(req.params.commentId);
       const comment_body = req.body.comment_body ? req.body.comment_body: oneComment.comment_body;
   await oneComment.remove(justOne)
   return res.send("Deleted Comment") // Comment was found and deleted 
   } 
   catch (err) { // error occurred
       console.log(err)
       res.status(400)
       return res.send("Database query failed")
   }
}


//update Comment 
const updateComment = async (req, res) => {
     try {
        const oneComment = await Comment.findById(req.params.commentId);
        const comment_body = req.body.comment_body ? req.body.comment_body: oneComment.comment_body;
        const update = {
            comment_body,
        }
    await oneComment.updateOne(update)
    return res.send("Updated Comment") // Comment was found and updated 
    } 
    catch (err) { // error occurred
        console.log(err)
        res.status(400)
        return res.send("Database query failed")
    }
}

// exporting the functions
module.exports = {
 getAllComments,
 getOneComment,
 addComment,
 deleteComment,
 updateComment,
 getContactsComments
}