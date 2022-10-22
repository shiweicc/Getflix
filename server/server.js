const axios = require('axios');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
app.use(express.json())
app.use(express.urlencoded({extended: false}));
const fakeData = require('../client/src/fakeData/fakeMovies.js')
const cors = require('cors');
const { pool } = require('./authConfig.js');
const bcrypt = require('bcrypt');
const fakeHistoryData = require('../client/src/fakeData/fakeHistory.js');

app.use(cors());


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

app.post('/login', async (req, res) => {
  let {
    username,
    password
  } = req.body;

  let isAuthenticated = false;

  axios.post('http://ec2-44-212-29-219.compute-1.amazonaws.com:3001/login', req.body).then((data) => console.log('this is the data', data));

  // pool.query(
  //   `SELECT * FROM users WHERE username = $1`, [username], (err, results) => {
  //     if (err) {
  //       throw err
  //     }
  //     if (results.rows.length > 0) {
  //       console.log(results.rows[0])
  //       let hashed = results.rows[0].password;
  //       function compareHash(password, hashed) {
  //         return bcrypt.compareSync(password, hashed)
  //       }
  //       if (compareHash(password, hashed)) {
  //         isAuthenticated = true;
  //         console.log(results.rows[0])
  //         res.status(200).send(results.rows[0].id)
  //       } else {
  //         res.status(400)
  //       }
  //     }
  //   }
  // )
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
