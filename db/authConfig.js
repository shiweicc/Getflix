// require('dotenv').config();

// const {Pool} = require('pg');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:1234@ec2-107-23-252-158.compute-1.amazonaws.com:5432/users')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'ec2-107-23-252-158.compute-1.amazonaws.com',
  database: 'getflix',
  password: '1234',
  port: 5432,
})
// const isProduction = process.env.NODE_ENV === 'production';

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString
// });

module.exports = { pool };