require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
const { pool } = require('../db/authConfig.js');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
// const passport = require('passport');
// const initializePassport = require('./passportConfig');
// initializePassport(passport);

const axios = require('axios')
const port = process.env.PORT || 3001;
const SIGNUP_URL = 'http://107.23.252.158:3001/signup'


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false

}));
// app.use(passport.initialize());
// app.use(passport.session() );
app.use(flash());


app.get('/', (req, res)=>{
  res.send({message:'Welcome to Getflix!'})
})

app.post('/signup', async (req, res)=>{
  let  { user, useremail, pwd } = req.body;
    const response = await axios.post(SIGNUP_URL, req.body);
    res.sendStatus(response.status);
})

app.get('/main',(req,res) => {
  //set up to go to microservice later
  res.send(fakeData.movies)
})

app.get('/profile', (req,res) => {
  //set up to go to microservice later
  res.send(fakeData.history)
})

app.post('/login', async (req, res) => {
  let {
    username,
    password
  } = req.body;

  let isAuthenticated = false;

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
          isAuthenticated = true;
          res.status(200).send('something')
        } else {
          res.status(400)
        }
      }
    }
  )
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})