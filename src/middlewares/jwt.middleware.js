var jwt = require('jsonwebtoken');

export const jwtToken = (data) => {
  var token = jwt.sign({ data }, process.env.Jwt_Key);
  return token;
};
