const axios = require('axios');

const getMovieData = (url) => {
  //console.log(url);
  let options = {
    method: 'get',
    url: `${url}`,
  }
  return axios(options);
}

module.exports = {
  getMovieData
}