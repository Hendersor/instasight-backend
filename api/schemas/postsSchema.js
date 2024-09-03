import Joi from 'joi'


const id = Joi.string().guid({version:"uuidv4"})
const description = Joi.string().trim()
const imageUrl = Joi.string().uri()
const uploadedDate = Joi.date();


const createPostSchema = Joi.object({
    id: id.required(),
    description: description.required(),
    imageUrl: imageUrl.required(),
    uploadedDate: uploadedDate.required()
})

const deletePostSchema = Joi.object({
    id: id.required()
})

export {createPostSchema, deletePostSchema}