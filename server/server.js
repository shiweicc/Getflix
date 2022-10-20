require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const fakeData = require('../client/src/fakeData/fakeMovies.js');
const fakeHistoryData = require('../client/src/fakeData/fakeHistory.js');
const SIGNUP_URL = 'http://107.23.252.158:3001/signup'
const cors = require('cors');
const axios = require('axios');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.post('/signup', async(req, res)=>{
  let  { user, useremail, pwd } = req.body;
  try{
    const response =  await axios.post(SIGNUP_URL, req.body);
    console.log(response.status)
    res.sendStatus(response.status)
  } catch (err) {
    console.log(err)
  }
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
