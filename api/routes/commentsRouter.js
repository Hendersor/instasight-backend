const express = require("express");
const { schemaValidator } = require("../middlewares/schemaValidator");
const { commentService } = require("../services/commentsService");
const { createCommentSchema } = require("../schemas/commentsSchema");

const router = express.Router();
const service = new commentService();

router.get("/", async (req, res, next) => {
  try {
    const data = await service.allComments();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", schemaValidator(createCommentSchema, "body"), async (req, res, next) => {
  try {
    const body = req.body;
    const comment = await service.createComment(body);
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
