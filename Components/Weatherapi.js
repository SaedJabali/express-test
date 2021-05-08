const superagent = require('superagent');
require('dotenv').config();

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const weather = (req, res) => {

    try {
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
      superagent.get(weatherBitUrl).then(weatherBitData => {
        const weatherArr = weatherBitData.body.data.map(element => new Weather(element));
        res.send(weatherArr);
  
      });
    } catch (error) {
      const weatherArr = weather.data.map(element => new Weather(element));
      res.send(weatherArr);
    }
  
}

  class Weather {
    constructor(data) {
      this.date = data.valid_date;
      this.description = data.weather.description;
    }
  }


  module.exports = weather;