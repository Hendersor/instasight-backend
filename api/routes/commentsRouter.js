const express = require("express");
const passport = require("passport");
const { schemaValidator } = require("../middlewares/schemaValidator");
const { commentService } = require("../services/commentsService");
const { createCommentSchema } = require("../schemas/commentsSchema");
const { checkUserRoles } = require("../middlewares/authHandler");


const router = express.Router();
const service = new commentService();

router.get("/comment-image", async (req, res, next) => {
  try {
    const { photo_id } = req.query;
    console.log(photo_id)
    // const data = await service.allComments();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", 
  passport.authenticate("jwt", { session: false }),
  checkUserRoles,
  schemaValidator(createCommentSchema, "body"), async (req, res, next) => {
  try {
    const {content, photo_id} = req.body;
    const user_id = req.user.sub;
    const newComment = {
      content,
      photo_id,
      user_id,
      created_at: new Date(),
    }
    const comment = await service.createComment(newComment);
    
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
