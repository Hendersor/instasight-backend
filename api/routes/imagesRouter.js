import Express from "express";
import { v4 as uuidv4 } from 'uuid';
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
      const {description} = req.body
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const imageBuffer = file.buffer;

      const post = {
        id: uuidv4(),
        img: imageBuffer, 
        user_id: "3af711bb-4a89-4281-bdf7-56030c992b98",  
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

router.delete(
  "/:id",
  schemaValidator(deletePostSchema, 'params'),
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      await service.deletePost(postId);
      res
        .status(200)
        .json({ message: "Post deleted successfully"});
    } catch (error) {
      next(error);
    }
  }
);

export { router };