const bcrypt = require('bcrypt');
let testPassword = 'Test@1234'


function generateHash(password){
  const salt = bcrypt.genSaltSync(15);
  const hash = bcrypt.hashSync(password,salt);
  return hash;
}

function compareHash(password, hashed) {
  return bcrypt.compareSync(password, hashed)
}

// console.log(generateHash('Miras04@'))
// $2b$15$DOAKwsgAmjDC3qd0C5./Q.omtsnrptibd7yN.nS58APn5H.p6KSXW
console.log(compareHash(testPassword, '$2b$15$rhtCz.7ICi.UK6yMoQgStOBidweUNmIpYoVAOlF/F0Iq5iUi9BUFy'))
