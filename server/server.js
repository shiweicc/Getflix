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
const profile = require('./routes/profile.js');
const getHistory = require('./routes/profile.js').getHistory;
const postHistory = require('./routes/profile.js').postHistory;
const deleteEachMovie = require('./routes/profile.js').deleteEachMovie;
const deleteAllMovies = require('./routes/profile.js').deleteAllMovies;

app.get('/test', (req, res)=>{
  res.json({message:'Welcome to Getflix!'})
})

app.get('/main', (req,res) => {
  //set up to go to microservice later
  res.send(fakeData.movies)
})


app.get('/profile/gethistory', (req,res) => {
  let userId = Number(req.query.userId);
  let url = 'http://localhost:8000/profile/gethistory';

  profile.getHistory(url, userId)
    .then((data) => {
      // console.log('Success GET history data at server: ', data.data);
      res.status(201).send(data.data);
    })
    .catch((err) => {
      // console.log('Fail to GET history data!', err);
      res.status(500).send(err);
    })
})

app.post('/main/updatehistory', (req,res) => {
  let userId = Number(req.body.userId);
  let movieId = Number(req.body.movieId);
  let data = {userId: userId, movieId: movieId}

  let url = 'http://localhost:8000/main/updatehistory';

  profile.postHistory(url, data)
    .then((data) => {
      // console.log(data.data);
      res.status(201).send(data.data);
    })
    .catch((err) => {
      // console.log('Fail to POST history data!', err);
      res.status(500).send(err);
    })
})

app.delete('/profile/removeeachmovie', (req, res) => {
  let userId = Number(req.query.userId);
  let movieId = Number(req.query.movieId);
  let data = {userId: userId, movieId: movieId}

  let url = 'http://localhost:8000/profile/removeeachmovie';

  profile.deleteEachMovie(url, data)
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => {
      // console.log('Fail to DELETE the movie data!', err);
      res.status(500).send(err);
    })
})

app.delete('/profile/clearhistory', (req, res) => {
  let userId = Number(req.query.userId);
  let data = {userId: userId}

  let url = 'http://localhost:8000/profile/clearhistory';

  profile.deleteAllMovies(url, data)
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => {
      // console.log('Fail to DELETE all movies data!', err);
      res.status(500).send(err);
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})