//Entry point for backend
//Code adapted from WEBINFO 
//Styling suggestions: 
//end line with ; 
//make comments about chunks of code 
//indent
const express = require('express');
const app = express();

app.get('/', (req, res) =>{
	res.send('<h1>Website</h1>');
})

app.listen(process.env.PORT || 3000, ()=> {
	console.log('The website app is listening on port 3000!');
})
