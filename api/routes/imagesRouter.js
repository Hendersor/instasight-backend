const express = require("express");
const passport = require("passport");
const { v4: uuidv4 } = require('uuid');
const { schemaValidator } = require("../middlewares/schemaValidator");
const { checkUserRoles } = require("../middlewares/authHandler");
const { createPostSchema, deletePostSchema } = require("../schemas/imagesSchema");
const { upload } = require("../config/multerConfig");
const { imageService } = require("../services/imageService");

const router = express.Router();
const service = new imageService();

router.get("/", async (req, res, next) => {
  try {
    const data = await service.allPosts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkUserRoles,
  upload.single("image"),
  schemaValidator(createPostSchema, 'body'),
  async (req, res, next) => {
    try {
      const { description } = req.body;
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const imageBuffer = file.buffer;

      const post = {
        id: uuidv4(),
        img: imageBuffer,
        user_id: "bf914012-a3cb-4902-b731-6d9c9cb3a5ca",
        description,
        created_at: new Date(),
      };
      console.log(post);
      const response = await service.createPost(post);
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error during image upload:", error);
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  schemaValidator(deletePostSchema, 'params'),
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      await service.deletePost(postId);
      res
        .status(200)
        .json({ message: "Post deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { router };
