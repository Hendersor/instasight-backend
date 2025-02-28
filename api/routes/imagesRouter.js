const express = require("express");
const passport = require("passport");
const { v4: uuidv4 } = require('uuid');
const { schemaValidator } = require("../middlewares/schemaValidator");
const { checkUserRoles } = require("../middlewares/authHandler");
const { createPostSchema } = require("../schemas/imagesSchema");
const { upload } = require("../config/multerConfig");
const { imageService } = require("../services/imageService");
const { LikeService } = require("../services/likeService");

const router = express.Router();
const service = new imageService();
const likeService = new LikeService();

router.get("/", async (req, res, next) => {
  try {
    const data = await service.allPosts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/user-posts",passport.authenticate("jwt", {session: false}),
 async (req, res, next) => {
  try{
    const userId = req.user.sub;
    const data = await service.getPostByUserId(userId);
    res.json(data);

  }catch(error){
    next(error)
  }
})

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
        user_id: req.user.sub,
        description,
        created_at: new Date(),
      };
      const response = await service.createPost(post);

      res.status(200).json(response);
    } catch (error) {
      console.error("Error during image upload:", error);
      next(error);
    }
  }
);

router.post("/:imageId/like", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  try{
    const userId = req.user.sub;
    const imageId = req.params.imageId;

    const response = await likeService.toggleLike(imageId, userId);
    if(!response){
      return res.status(400).json({message: "Like removed"});
    }
    res.json({message: "Like added"});

  }catch(error){
    next(error);
  }
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      const userId = req.user.sub;

      const post = await service.getPost(postId);
      const postUserId = post.dataValues.user_id;
      if(!post || postUserId !== userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }


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
