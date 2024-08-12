import  Express from "express";
import {router as postsRouter} from "./postsRouter.js"
import {router as bookmarksRouter} from "./bookmarksRouter.js"

function routerApi(app){
    const router = Express.Router()
    app.use("/api/v1", router)
    router.use("/posts", postsRouter)
    router.use("/bookmarks", bookmarksRouter)
}

export {routerApi}