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
const passport = require('passport');

const initializePassport = require('./passportConfig');
initializePassport(passport);

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session() );
app.use(flash());

const fakeData = require('../client/src/fakeData/fakeMovies.js')

app.get('/', (req, res)=>{
  res.send({message:'Welcome to Getflix!'})
})

app.post('/signup', checkAuthenticated, async (req, res)=>{
  let  { user, useremail, pwd } = req.body;
  let hashedPassword = await bcrypt.hash(pwd, 15);
  pool.query(
    `SELECT * FROM users WHERE useremail = $1`, [useremail], (err, results) => {
      if (err) {
        throw err
      }
      if (results.rows.length > 0) {
        res.sendStatus(409);
      } else {
        pool.query(`INSERT INTO users (username, useremail, password)
        VALUES ($1, $2, $3)
        RETURNING id, password`, [user, useremail, hashedPassword],
        (err, results) => {
          if (err) {
            throw err;
          }
          res.sendStatus(200);
          // res.redirect('/login')
        })
      }
    }
  )
})

app.get('/main', checkNotAuthenticated,(req,res) => {
  //set up to go to microservice later
  res.send(fakeData.movies)
})

app.get('/profile', (req,res) => {
  //set up to go to microservice later
  res.send(fakeData.history)
})

app.post('/users/login', passport.authenticate('local',{
  successRedirect: "/main",
  failureRedirect: "/login",
  failureFlash: true
}))



function checkAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return res.redirect('/profile');
  }
  next();
}

function checkNotAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})