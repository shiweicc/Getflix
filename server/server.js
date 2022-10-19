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
const postHistory = require('./routes/profile.js').postHistory;


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
      console.log('Success GET history data at server: ', data.data);
      res.status(201).send(data.data);
    })
    .catch((err) => {
      console.log('Fail to GET history data!', err);
      res.status(500).send('Fail to GET history data at server!');
    })
  // res.send(fakeHistoryData.history)
})

app.post('/main', (req,res) => {
  let userId = Number(req.body.userId);
  let movieId = Number(req.body.movieId);
  let data = {userId: userId, movieId: movieId}

  let url = 'http://localhost:8000/main';

  postHistory(url, data)
    .then((data) => {
      console.log(data.data);
      res.status(201).send(data.data);
    })
    .catch((err) => {
      console.log('Fail to POST history data!', err);
      res.status(500).send('Fail to POST history data!');
    })
})


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})