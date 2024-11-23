import Express from "express";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { createPostSchema, deletePostSchema } from "../schemas/imagesSchema.js";
import { upload } from "../config/multerConfig.js";
import { imageService } from "../services/imageService.js";

const router = Express.Router();
const service = new imageService();

router.get("/", async (req, res) => {
  const data = await service.allPosts();
  res.json(data);
});

router.post(
  "/",
  upload.single("image"),
  schemaValidator(createPostSchema, 'body'),
  async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const post = {
        id: req.body.id,
        description: req.body.description,
        imageUrl: file.path,
        uploadedDate: req.body.uploadedDate,
      };

      const response = await service.createPost(post);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  schemaValidator(deletePostSchema, 'body'),
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      const response = await service.deletePost(postId);
      res
        .status(200)
        .json({ message: "Post deleted successfully", id: response });
    } catch (error) {
      next(error);
    }
  }
);

export { router };
