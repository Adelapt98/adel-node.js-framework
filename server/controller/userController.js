const { validate } = require("../schema/schemaService")
const { ok, error } = require("../util/response")

const userSchema = require("../schema/schemas/userSchema")
const userService = require('../service/userService')

exports.signUp = (request, response) => {
  validate(userSchema.signUp, request.body, response)
  
  userService.signUp(request.body)
};

