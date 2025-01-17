const express = require("express");
const { router: imagesRouter } = require("./imagesRouter");
const { router: bookmarksRouter } = require("./bookmarksRouter");
const { router: usersRouter } = require("./usersRouter");
const { router: commentsRouter } = require("./commentsRouter");
const { router: authRouter } = require("./authRouter");
const { router: profileRouter } = require("./profileRouter");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/images", imagesRouter);
  router.use("/bookmarks", bookmarksRouter);
  router.use("/users", usersRouter);
  router.use("/comments", commentsRouter);
  router.use("/auth", authRouter);
  router.use("/profile", profileRouter);
}

module.exports = { routerApi };
