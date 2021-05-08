const express = require('express')
const app = express()
const weatherData = require('./assets/weather.json')
const cors = require('cors')
const superagent = require('superagent');
const { request } = require('express');
require('dotenv').config();
app.use(cors());
const movies = require('./Components/Moviesapi')
const weather = require ('./Components/Weatherapi')

const PORT = process.env.PORT;


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/weather', weather)

app.get('/movies', movies)

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});