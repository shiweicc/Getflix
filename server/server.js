require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const axios = require('axios');
app.use(express.json())
app.use(express.urlencoded({extended: false}));
const fakeData = require('../client/src/fakeData/fakeMovies.js');
// const fakeHistoryData = require('../client/src/fakeData/fakeHistory.js');
const getHistory = require('./routes/profile.js').getHistory;


app.get('/test', (req, res)=>{
  res.json({message:'Welcome to Getflix!'})
})

app.get('/main', (req,res) => {
  //set up to go to microservice later
  res.send(fakeData.movies)
})


app.get('/profile', (req,res) => {
  let userId = Number(req.query.userId);
  let url = 'http://localhost:8000/profile';

  getHistory(url, userId)
    .then((data) => {
      console.log('Success get history data: ', data.data);
      res.status(201).send(data.data);
    })
    .catch((err) => {
      console.log('Fail to get product data!', err);
      res.status(500).send('Fail to get history data!');
    })
  // res.send(fakeHistoryData.history)
})



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})