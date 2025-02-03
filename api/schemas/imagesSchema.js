const Joi = require('joi')
const description = Joi.string().trim()


const createPostSchema = Joi.object({
    description: description.required(),
})



module.exports = {createPostSchema}