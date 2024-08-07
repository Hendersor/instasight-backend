import Express from 'express'

const router = Express.Router();

router.get("/", async(req, res) => {
    const data = {text: "Hello!"}
    res.json(data)
})

export {router}