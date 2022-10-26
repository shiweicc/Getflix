require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const fakeData = require('../client/src/fakeData/fakeMovies.js');
const profile = require('./routes/profile.js');
const { pool } = require('./authConfig.js');

const bcrypt = require('bcrypt');
const SIGNUP_URL = 'http://107.23.252.158:3001/signup'
const UPDATE_PWD_URL = 'http://107.23.252.158:3001/updateUserPwd'
const UPDATE_USERNAME_URL = 'http://107.23.252.158:3001/updateUserName'
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/signup', async(req, res)=>{
  let  { user, useremail, pwd } = req.body;
  try{
    const response =  await axios.post(SIGNUP_URL, req.body);
    if (response.status === 200){

    }
    res.sendStatus(response.status)
  } catch (err) {
    console.log(err)
  }
})

app.post('/updateUserPwd', async(req, res)=>{
  let  { userId, pwd } = req.body;
  try{
    const response =  await axios.post(UPDATE_PWD_URL, req.body);
    if (response.status === 200){

    }
    res.sendStatus(response.status)
  } catch (err) {
    console.log(err)
  }
})

app.post('/updateUserName', async(req, res)=>{
  let  { userId, useremail, pwd } = req.body;
  try{
    const response =  await axios.post(UPDATE_USERNAME_URL, req.body);
    if (response.status === 200){

    }
    res.sendStatus(response.status)
  } catch (err) {
    console.log(err)
  }
})

app.get('/main', (req,res) => {
  let url = `http://54.183.28.106:3002/main`
  axios.get(url)
    .then((response) => {
      res.send(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
})


app.get(`/profile/gethistory`, (req,res) => {
  const userId = Number(req.query.userId);

  let url = `http://localhost:8000/profile/gethistory?user_id=${userId}`;

  profile.getHistory(url)
    .then((data) => {
      res.status(201).send(data.data);
    })
    .catch((err) => {
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
      res.status(201).send(data.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.post('/login', async (req, res) => {
  let {
    username,
    password
  } = req.body;

  pool.query(
    `SELECT * FROM users WHERE username = $1`, [username], (err, results) => {
      if (err) {
        throw err
      }
      if (results.rows.length > 0) {
        let hashed = results.rows[0].password;
        function compareHash(password, hashed) {
          return bcrypt.compareSync(password, hashed)
        }
        if (compareHash(password, hashed)) {
          res.status(200).send(results.rows[0].id)
        } else {
          res.status(400)
        }
      }
    }
  )
})

app.get('/logout', async function(req, res, next) {
  localStorage.removeItem('logged in id')
  res.redirect('/');
});


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
      res.status(201).send(data.data);
    })
    .catch((err) => {
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
      res.status(500).send(err);
    })
})

app.get('/details/recommended/:movieId', (req, res) => {
  let movie = req.params.movieId;
  let options = {
    method: 'GET',
    url: `http://3.82.229.130:8000/details/recommended/${movie}`
  }
  axios.request(options)
    .then((response) => {
      res.status(200);
      //console.log('details server', response)
      res.json(response.data);
    })
    .catch((error) => {
      res.sendStatus(404);
      return Promise.reject(error);
    })
})

app.get('/details/watchProviders/:movieId', (req, res) => {
  // console.log('details/watch provider', req.params.movieId)
  let id = req.params.movieId;
  let options = {
    method: 'GET',
    url: `http://3.82.229.130:8000/details/watchProviders/${id}`
  }
  axios.request(options)
    .then((response) => {
      res.status(200);
      //console.log('server watch', response.data);
      res.json(response.data);
    })
    .catch((error) => {
      res.sendStatus(404);
      return Promise.reject(error);
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
