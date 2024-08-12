import Express from 'express'
import Boom from '@hapi/boom'
import { bookmarksService } from '../services/bookmarksService.js'

const router = Express.Router()


router.get('/', async(req, res) => {
    const data = {bookmarks: "1"}
    res.json(data)
})

router.delete('/:id', async(req, res, next)=> {
    try{
      const service = new bookmarksService;
      const idBookmark = req.body
      const response  = await service.deleteBookmark(idBookmark)
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


router.get("/test-boom-error", (req, res, next) => {
  try {
    throw Boom.notFound("Simulated Boom error");
  } catch (err) {
    next(err);
  }
});

router.get("/test-generic-error", (req, res, next) => {
  try {
    throw new Error("Simulated generic error");
  } catch (err) {
    next(err);
  }
});

export {router}