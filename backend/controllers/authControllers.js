// This file is responsible on collacting all the controllers files
const postLogin = require('./postLogin')
const postRegister = require('./postRegister')

exports.controllers = {
  postLogin,
  postRegister,
}
