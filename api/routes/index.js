import  Express from "express";
import {router as imagesRouter} from "./imagesRouter.js"
import {router as bookmarksRouter} from "./bookmarksRouter.js"
import {router as usersRouter} from "./usersRouter.js"

function routerApi(app){
    const router = Express.Router()
    app.use("/api/v1", router)
    router.use("/images", imagesRouter)
    router.use("/bookmarks", bookmarksRouter)
    router.use("/users", usersRouter)
}

export {routerApi}