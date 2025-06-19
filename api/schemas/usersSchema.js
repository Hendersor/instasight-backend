const Joi = require("joi");

const userName = Joi.string().alphanum();
const email = Joi.string().email();
const password = Joi.string().alphanum();
const id = Joi.string().guid({ version: "uuidv4" });


const createUserSchema = Joi.object({
  email: email.required(),
  username: userName.required(),
  password: password.required(),
});

const findUserSchema = Joi.object({
    id: id.required().uuid().required(),
})


const updateUserSchema = Joi.object({
  profile_picture: Joi.binary().allow(null),
  bio: Joi.string().allow(null),
});

module.exports = { createUserSchema, updateUserSchema, findUserSchema };