import Express from 'express'
import { bookmarksService } from '../services/bookmarksService.js'

const router = Express.Router()

router.get('/', async(req, res) => {
    const data = {bookmarks: "1"}
    res.json(data)
})

router.delete('/:id', async(req, res, next)=> {
    try{
      const service = new bookmarksService;
      const {id} = req.params
      const response  = await service.deleteBookmark(id)
      res.json(response)
    }
    catch(err){
       next(err)
    }

})

router.post("/", async(req, res) => {
    const body = req.body;
    const newBookmark = body
    res.json(newBookmark)
})


export {router}