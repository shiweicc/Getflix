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

module.exports = { pool };