import Express from 'express'
import { schemaValidator } from '../middlewares/schemaValidator';
import {createPostSchema, deletePostSchema} from '../schemas/postsSchema'

const router = Express.Router();

router.get("/", async(req, res) => {
    const data = {text: "Hello!"}
    res.json(data)
})

router.post("/", schemaValidator(createPostSchema, body), async(req, res, next) => {

})

router.delete("/", schemaValidator(deletePostSchema, body), async(req, res, next) => {

})


export {router}