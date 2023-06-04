'use strict';

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'jwt secret';

function sign(email, expiredIn = "30m") {
  return jwt.sign({email}, process.env.JWT_SECRET || JWT_SECRET, {expiredIn});
}

function verify(token) {
  try {
    jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {sign, verify};
