const superagent = require('superagent');
require('dotenv').config();

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;
const inMemory = {};

const movies = (req, res) => {
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&language=en-US&page=1&include_adult=false&query=${req.query.query}`

  // const queryParams = {
  //   page: 1,
  //   app_key: MOVIES_API_KEY,
  //   include_adult: false,
  //   query: `${req.query.query}`
  // };
  superagent.get(movieUrl).then(movieData => {
    if (inMemory[req.query.query] !== undefined) {
console.log('Hello from if');
      res.send(inMemory[req.query.query])
    } else {
      console.log('hello from else');
      const movieArr = movieData.body.results.map(element => new Movie(element))
      inMemory[req.query.query] = movieArr;
      res.send(movieArr);
    }
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
