import Joi from 'joi'

const id = Joi.string().guid({version:"uuidv4"})


const deleteBookmarkSchema = Joi.object({
    id: id.required().uuid().required()
})

const createBookmarkSchema = Joi.object({
    user_id: Joi.string().uuid().required(),
    image_id: Joi.string().uuid().required(),
})



export {deleteBookmarkSchema, createBookmarkSchema}
