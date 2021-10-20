//Entry point for backend
//Code adapted from WEBINFO 
//Styling suggestions: 
//end line with ; 
//make comments about chunks of code 
//indent
const cors = require('cors')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride('_method'));
require('./models');
require("./models/comments");



const contactRouter = require('./routes/contactRouter');
const eventRouter = require('./routes/eventRouter');
const commentRouter = require('./routes/commentRouter');

// handler for clients
app.use('/contacts', contactRouter);
// handler for events
app.use('/events', eventRouter);
// handler for comments
app.use('/comments', commentRouter);

app.get('/', (req, res) =>{
	res.send('<h1>Website</h1>');
})

app.listen(process.env.PORT || 4000, ()=> {
	console.log('The website app is listening on port 4000!');
})
