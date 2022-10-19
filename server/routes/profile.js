const axios = require('axios');

const getHistory = (url) => {
  let options = {
    method: 'get',
    url: `${url}`,
  };
  return axios(options);
}

const postHistory = (url, data) => {
  let options = {
    method: 'post',
    url: `${url}`,
    data:data,
  };
  return axios(options);
}

module.exports = {
  getHistory,
  postHistory
}