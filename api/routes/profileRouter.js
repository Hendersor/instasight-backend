const express = require("express");
const passport = require("passport");
const {bookmarksService} = require("../services/bookmarksService");


const router = express.Router();

const service = new bookmarksService();

router.get("/my-bookmarks", passport.authenticate('jwt', {session: false}),
 async (req, res, next) => {
  try {
    const user = req.user;
    const bookmarks = await service.findByUser(user.sub);
    res.json(bookmarks)

  } catch (error) {
    next(error);
  }
});

module.exports = { router };
