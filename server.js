// Import npm packages
const express = require('express');
const { appendFile } = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const { stringify } = require('querystring');
var mysql = require('mysql');

const DB_NAME = "testdatabase2"
/*
var msqlCon = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : DB_NAME
});

msqlCon.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MYSQL!");
});*/

const app = express();
const PORT = process.env.PORT || 8080;

const routes =  require('./routes/api')

// MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/' + DB_NAME
mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Logger
app.use(morgan('tiny'));
app.use('/api',routes);

app.listen(PORT,console.log(`Server is starting at ${PORT}`))