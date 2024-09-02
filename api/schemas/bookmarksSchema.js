import Joi from 'joi'

const id = Joi.string().guid({version:"uuidv4"})


const deleteBookmarkSchema = Joi.object({
    id: id.required()
})

const createBookmarkSchema = Joi.object({
    id: id.required()
})



export {deleteBookmarkSchema, createBookmarkSchema}
