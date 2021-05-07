const express = require('express')
const app = express()
const weatherData = require('./assets/weather.json')
const cors = require('cors')
// const superagent = require('superagent');
require('dotenv').config();
const PORT = process.env.PORT;
app.use(cors());

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/weather', (req, res) => {
  const weatherArr = weatherData.data.map(element => new Weather(element));
  res.send(weatherArr);
});

// app.get('/weather', (req, res) => {

//   try {
//     console.log(req.query);
//     const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
//     superagent.get(weatherBitUrl).then(weatherBitData => {
//       const weatherArr = weatherBitData.body.weatherData.map(element => new weatherData(element));
//       res.send(weatherArr);
//       console.log(weatherArr);
//     });
//   } catch (error) {
//     console.log(weatherBitUrl);
//     const weatherArr = weatherData.data.map(element => new weatherData(element));
//     res.send(weatherArr);
//   }

// });
class Weather {
  constructor(data) {
    this.date = data.valid_date;

    this.description = data.weather.description;
  }
}

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});