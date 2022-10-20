require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
app.use(express.json())
app.use(express.urlencoded({extended: false}));
const fakeData = require('../client/src/fakeData/fakeMovies.js');
const fakeHistoryData = require('../client/src/fakeData/fakeHistory.js');



app.get('/test', (req, res)=>{
  res.json({message:'Welcome to Getflix!'})
})

app.get('/main', (req,res) => {
  //set up to go to microservice later
  res.send(fakeData.movies)
})

app.get('/profile', (req,res) => {
  //set up to go to microservice later
  res.send(fakeHistoryData.history)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
