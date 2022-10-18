const axios = require('axios');

const getHistory = (url) => {
  let options = {
    method: 'get',
    url: `${url}`,
    // headers: headers,
    // params: userId
  };
  return axios(options);
}

module.exports = {
  getHistory
}