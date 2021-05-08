const superagent = require('superagent');
require('dotenv').config();

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;

const movies = (req, res) => {
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&language=en-US&page=1&include_adult=false&query=${req.query.query}`
  superagent.get(movieUrl).then(movieData => {
    const movieArr = movieData.body.results.map(element => new Movie(element))
    res.send(movieArr)
  });
}

class Movie {
    constructor(data) {
      this.title = data.title
      this.image = data.poster_path;
      this.released_date = data.release_date;
    }
  }

  module.exports = movies; 
  