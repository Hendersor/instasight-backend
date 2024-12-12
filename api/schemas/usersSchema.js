const Joi = require("joi");

const id = Joi.string().guid({ version: "uuidv4" });
const userName = Joi.string().alphanum();
const email = Joi.string().email();
const password = Joi.string().alphanum();

const createUserSchema = Joi.object({
  email: email.required(),
  username: userName.required(),
  password: password.required(),
});


const findUserSchema = Joi.object({
  id: id.required(),
});

const editUserSchema = Joi.object({
  id: id,
  email: email,
  username: userName,
  password: password,
});

module.exports = { createUserSchema, findUserSchema, editUserSchema };