const Express = require("express");
const passport = require("passport");
const { bookmarksService } = require("../services/bookmarksService");
const { schemaValidator } = require("../middlewares/schemaValidator");
const {
  deleteBookmarkSchema,
  createBookmarkSchema,
} = require("../schemas/bookmarksSchema");
const { checkUserRoles } = require("../middlewares/authHandler");


const router = Express.Router();
const service = new bookmarksService();

router.get("/", 
  passport.authenticate("jwt", { session: false }),
  checkUserRoles,
  async (req, res, next) => {
  try {
    const response = await service.allBookmarks();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

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

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkUserRoles,
  schemaValidator(deleteBookmarkSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.deleteBookmark(id);
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkUserRoles,
  schemaValidator(createBookmarkSchema, "body"),
  async (req, res, next) => {
    try {
      const bookmark = req.body;
      const response = await service.createBookmark(bookmark);

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { router };
