const Joi  = require('joi')

const id = Joi.string().guid({version:"uuidv4"})

const createCommentSchema = Joi.object({
    content: Joi.string()
    .min(1)
    .max(500)
    .required(),
    photo_id: id.uuid().required(),
    user_id: id.uuid().optional(),
})

module.exports = {createCommentSchema}