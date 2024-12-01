import Joi from 'joi'


const id = Joi.string().guid({version:"uuidv4"})
const description = Joi.string().trim()
const uploadedDate = Joi.date();


const createPostSchema = Joi.object({
    description: description.required(),
})

const deletePostSchema = Joi.object({
    id: id.required()
})

export {createPostSchema, deletePostSchema}