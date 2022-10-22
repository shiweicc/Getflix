require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const fakeData = require('../client/src/fakeData/fakeMovies.js');
const { pool } = require('./authConfig.js');

const bcrypt = require('bcrypt');
const fakeHistoryData = require('../client/src/fakeData/fakeHistory.js');
const SIGNUP_URL = 'http://107.23.252.158:3001/signup'
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

app.get('/main', (req,res) => {
  //set up to go to microservice later
  console.log('test')
  res.send(fakeData.movies)
})

app.get('/profile', (req,res) => {
  //set up to go to microservice later
  res.send(fakeHistoryData.history)
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
